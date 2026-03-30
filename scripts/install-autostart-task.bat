@echo off
setlocal EnableExtensions

set "TASK_NAME=PortfolioFunnelAutostart"
set "SCRIPT_PATH=%~dp0start-portfolio-funnel.bat"
for %%I in ("%SCRIPT_PATH%") do set "SCRIPT_PATH=%%~fI"
set "STARTUP_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "STARTUP_LAUNCHER=%STARTUP_DIR%\PortfolioFunnelAutostart.cmd"

schtasks /Create ^
  /TN "%TASK_NAME%" ^
  /SC ONLOGON ^
  /TR "\"%SCRIPT_PATH%\"" ^
  /F

if errorlevel 1 (
  echo Scheduled Task creation failed. Falling back to Startup folder...
  if not exist "%STARTUP_DIR%" (
    echo Startup folder not found: "%STARTUP_DIR%"
    exit /b 1
  )
  (
    echo @echo off
    echo call "%SCRIPT_PATH%"
  ) > "%STARTUP_LAUNCHER%"

  if not exist "%STARTUP_LAUNCHER%" (
    echo Failed to create Startup launcher.
    exit /b 1
  )

  echo Startup launcher created at:
  echo   "%STARTUP_LAUNCHER%"
  echo Running startup script once now...
  call "%SCRIPT_PATH%"
  if errorlevel 1 (
    echo Startup launcher was created, but immediate run failed. Check logs folder.
    exit /b 1
  )
  echo Done. Auto-start is active via Startup folder.
  exit /b 0
)

echo Scheduled task "%TASK_NAME%" created.
echo Running it now once to verify...

schtasks /Run /TN "%TASK_NAME%"

if errorlevel 1 (
  echo Task created but failed to run immediately. Check Task Scheduler logs.
  exit /b 1
)

echo Done. Your portfolio startup task is active.
exit /b 0
