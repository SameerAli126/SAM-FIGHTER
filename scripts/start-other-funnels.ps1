param(
  [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"

$PortfolioRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$WorkspaceRoot = Resolve-Path (Join-Path $PortfolioRoot "..")
$LogsDir = Join-Path $PortfolioRoot "logs"

$PhotoStreamRoot = Join-Path $WorkspaceRoot "Photostream"
$SamioRoot = Join-Path $WorkspaceRoot "samio"
$CivicRoot = Join-Path $WorkspaceRoot "learnPHP"

$PhotoStreamPort = 4174
$SamioAppPort = 3000
$SamioFunnelPort = 8443
$CivicAppPort = 8000
$CivicFunnelPort = 10000

$PhpExe = "C:\xampp\php\php.exe"
$ComposerPhar = Join-Path $CivicRoot "tools\composer.phar"
$SamioLauncher = Join-Path $SamioRoot "scripts\run-with-funnel.ps1"

function Write-Step([string]$Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Write-Ok([string]$Message) {
  Write-Host "OK: $Message" -ForegroundColor Green
}

function Write-WarnMsg([string]$Message) {
  Write-Host "WARN: $Message" -ForegroundColor Yellow
}

function Require-Path([string]$Path, [string]$Label) {
  if (-not (Test-Path $Path)) {
    throw "$Label not found at '$Path'."
  }
}

function Get-CommandPath([string]$Name) {
  $command = Get-Command $Name -ErrorAction SilentlyContinue
  if (-not $command) {
    return $null
  }

  return $command.Source
}

function Prepare-LogPath([string]$Path) {
  if (-not (Test-Path $Path)) {
    return $Path
  }

  try {
    Remove-Item $Path -Force -ErrorAction Stop
    return $Path
  } catch {
    $dir = Split-Path $Path -Parent
    $name = [System.IO.Path]::GetFileNameWithoutExtension($Path)
    $ext = [System.IO.Path]::GetExtension($Path)
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    return (Join-Path $dir "$name.$stamp$ext")
  }
}

function Stop-PortListeners([int]$Port) {
  $listeners = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique

  foreach ($pid in $listeners) {
    if ($pid -and $pid -ne $PID) {
      try {
        Stop-Process -Id $pid -Force -ErrorAction Stop
        Write-WarnMsg "Stopped existing listener on port $Port (PID $pid)."
      } catch {
        Write-WarnMsg "Could not stop PID $pid on port ${Port}: $($_.Exception.Message)"
      }
    }
  }
}

function Wait-ForTcpPort([int]$Port, [int]$TimeoutSeconds = 45) {
  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)

  while ((Get-Date) -lt $deadline) {
    $listener = Get-NetTCPConnection -State Listen -LocalPort $Port -ErrorAction SilentlyContinue |
      Select-Object -First 1
    if ($listener) {
      return $true
    }

    Start-Sleep -Seconds 2
  }

  return $false
}

function Start-BackgroundProcess(
  [string]$FilePath,
  [string[]]$ArgumentList,
  [string]$WorkingDirectory,
  [string]$StdOutPath,
  [string]$StdErrPath
) {
  $stdOut = Prepare-LogPath -Path $StdOutPath
  $stdErr = Prepare-LogPath -Path $StdErrPath

  Start-Process `
    -FilePath $FilePath `
    -ArgumentList $ArgumentList `
    -WorkingDirectory $WorkingDirectory `
    -WindowStyle Hidden `
    -RedirectStandardOutput $stdOut `
    -RedirectStandardError $stdErr | Out-Null
}

Require-Path -Path $PhotoStreamRoot -Label "PhotoStream project"
Require-Path -Path $SamioRoot -Label "SAMIO project"
Require-Path -Path $CivicRoot -Label "Civic Atlas project"
Require-Path -Path $PhpExe -Label "PHP executable"
Require-Path -Path $ComposerPhar -Label "Composer PHAR"
Require-Path -Path $SamioLauncher -Label "SAMIO funnel launcher"

$npmPath = Get-CommandPath "npm.cmd"
if (-not $npmPath) {
  $npmPath = Get-CommandPath "npm"
}
if (-not $npmPath) {
  throw "npm is required but was not found in PATH."
}

$npxPath = Get-CommandPath "npx.cmd"
if (-not $npxPath) {
  $npxPath = Get-CommandPath "npx"
}
if (-not $npxPath) {
  throw "npx is required but was not found in PATH."
}

$tailscalePath = Get-CommandPath "tailscale.exe"
if (-not $tailscalePath) {
  $tailscalePath = Get-CommandPath "tailscale"
}
if (-not $tailscalePath) {
  throw "tailscale CLI is required but was not found in PATH."
}

if (-not (Test-Path $LogsDir)) {
  New-Item -ItemType Directory -Path $LogsDir | Out-Null
}

Write-Host "Other project funnel launcher" -ForegroundColor White
Write-Host "Workspace: $WorkspaceRoot" -ForegroundColor DarkGray

Write-Step "Resetting current Tailscale Funnel configuration"
& $tailscalePath funnel reset | Out-Null
Write-Ok "Previous funnel mappings cleared."

Write-Step "Building and serving PhotoStream on local port $PhotoStreamPort"
Push-Location $PhotoStreamRoot
& $npmPath run build
Pop-Location

Stop-PortListeners -Port $PhotoStreamPort
Start-BackgroundProcess `
  -FilePath $npxPath `
  -ArgumentList @("-y", "http-server", (Join-Path $PhotoStreamRoot "dist"), "-p", "$PhotoStreamPort", "-a", "127.0.0.1", "-c-1") `
  -WorkingDirectory $PhotoStreamRoot `
  -StdOutPath (Join-Path $LogsDir "photostream-http.log") `
  -StdErrPath (Join-Path $LogsDir "photostream-http.err.log")

if (-not (Wait-ForTcpPort -Port $PhotoStreamPort -TimeoutSeconds 30)) {
  throw "PhotoStream did not start listening on port $PhotoStreamPort."
}

& $tailscalePath funnel --bg --yes --https=443 $PhotoStreamPort | Out-Null
Write-Ok "PhotoStream is mapped to Funnel HTTPS port 443."

Write-Step "Starting SAMIO on local port $SamioAppPort and Funnel port $SamioFunnelPort"
& powershell -NoProfile -ExecutionPolicy Bypass -File $SamioLauncher -AppPort $SamioAppPort -FunnelPort $SamioFunnelPort -StartupTimeoutSeconds 90

Write-Step "Preparing Civic Atlas dependencies and assets"
if (-not (Test-Path (Join-Path $CivicRoot "vendor"))) {
  if ($SkipInstall) {
    throw "Civic Atlas vendor directory is missing and -SkipInstall was supplied."
  }

  Push-Location $CivicRoot
  & $PhpExe $ComposerPhar install --no-interaction
  Pop-Location
}

if (-not (Test-Path (Join-Path $CivicRoot "node_modules"))) {
  if ($SkipInstall) {
    throw "Civic Atlas node_modules is missing and -SkipInstall was supplied."
  }

  Push-Location $CivicRoot
  & $npmPath install
  Pop-Location
}

Push-Location $CivicRoot
& $npmPath run build
Pop-Location

Write-Step "Starting Civic Atlas on local port $CivicAppPort and Funnel port $CivicFunnelPort"
Stop-PortListeners -Port $CivicAppPort
Start-BackgroundProcess `
  -FilePath $PhpExe `
  -ArgumentList @("artisan", "serve", "--host=127.0.0.1", "--port=$CivicAppPort") `
  -WorkingDirectory $CivicRoot `
  -StdOutPath (Join-Path $LogsDir "civic-atlas.log") `
  -StdErrPath (Join-Path $LogsDir "civic-atlas.err.log")

if (-not (Wait-ForTcpPort -Port $CivicAppPort -TimeoutSeconds 45)) {
  throw "Civic Atlas did not start listening on port $CivicAppPort."
}

& $tailscalePath funnel --bg --yes --https=$CivicFunnelPort $CivicAppPort | Out-Null
Write-Ok "Civic Atlas is mapped to Funnel HTTPS port $CivicFunnelPort."

$funnelStatus = (& $tailscalePath funnel status | Out-String).Trim()
$publicUrls = [regex]::Matches($funnelStatus, "https://[^\s]+") | ForEach-Object { $_.Value } | Select-Object -Unique

$photoStreamUrl = $publicUrls | Where-Object { $_ -notmatch ":(8443|10000)$" } | Select-Object -First 1
$samioUrl = $publicUrls | Where-Object { $_ -match ":8443$" } | Select-Object -First 1
$civicUrl = $publicUrls | Where-Object { $_ -match ":10000$" } | Select-Object -First 1

Write-Host ""
Write-Host "==========================" -ForegroundColor DarkGray
Write-Host "Funnel Summary" -ForegroundColor White
Write-Host "PhotoStream: $photoStreamUrl"
Write-Host "SAMIO:       $samioUrl"
Write-Host "Civic Atlas: $civicUrl"
Write-Host "==========================" -ForegroundColor DarkGray
