@echo off
setlocal EnableExtensions

set "TASK_NAME=PortfolioFunnelAutostart"
set "STARTUP_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "STARTUP_LAUNCHER=%STARTUP_DIR%\PortfolioFunnelAutostart.cmd"

schtasks /Delete /TN "%TASK_NAME%" /F

if errorlevel 0 (
  echo Task "%TASK_NAME%" removed.
) else (
  echo Task "%TASK_NAME%" not removed or not present.
)

if exist "%STARTUP_LAUNCHER%" (
  del /F /Q "%STARTUP_LAUNCHER%"
  if exist "%STARTUP_LAUNCHER%" (
    echo Failed to remove Startup launcher.
    exit /b 1
  )
  echo Startup launcher removed.
) else (
  echo Startup launcher not present.
)

exit /b 0
