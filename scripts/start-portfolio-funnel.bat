@echo off
setlocal EnableExtensions

set "SCRIPT_DIR=%~dp0"
for %%I in ("%SCRIPT_DIR%..") do set "PROJECT_DIR=%%~fI"
set "LOG_DIR=%PROJECT_DIR%\logs"
set "PORT=4173"
set "TS_EXE=C:\Program Files\Tailscale\tailscale.exe"
set "NPX_CMD=C:\Program Files\nodejs\npx.cmd"

if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

echo [%date% %time%] Startup script triggered.>>"%LOG_DIR%\startup.log"

if not exist "%TS_EXE%" (
  echo [%date% %time%] ERROR: tailscale.exe not found at "%TS_EXE%".>>"%LOG_DIR%\startup.log"
  exit /b 1
)

if not exist "%NPX_CMD%" (
  echo [%date% %time%] ERROR: npx.cmd not found at "%NPX_CMD%".>>"%LOG_DIR%\startup.log"
  exit /b 1
)

if not exist "%PROJECT_DIR%\dist\index.html" (
  echo [%date% %time%] dist missing, running npm build.>>"%LOG_DIR%\startup.log"
  pushd "%PROJECT_DIR%"
  call npm run build 1>>"%LOG_DIR%\build.log" 2>&1
  popd
)

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do (
  taskkill /PID %%P /F >nul 2>&1
)

powershell -NoProfile -Command "Start-Process -WindowStyle Minimized -FilePath '%NPX_CMD%' -ArgumentList @('-y','http-server','%PROJECT_DIR%\dist','-p','%PORT%','-a','0.0.0.0','-c-1') -RedirectStandardOutput '%LOG_DIR%\http-server.log' -RedirectStandardError '%LOG_DIR%\http-server.err.log'"

timeout /t 3 /nobreak >nul

"%TS_EXE%" funnel --bg --yes %PORT% 1>>"%LOG_DIR%\funnel.log" 2>&1

"%TS_EXE%" funnel status 1>>"%LOG_DIR%\funnel.log" 2>&1

echo [%date% %time%] Startup script completed.>>"%LOG_DIR%\startup.log"
exit /b 0
