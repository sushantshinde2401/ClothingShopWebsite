@echo off
title Mad'ora preview server
cd /d "%~dp0"
echo Building Mad'ora site...
call npm.cmd run build
if errorlevel 1 (
  echo.
  echo Build failed.
  pause
  exit /b 1
)
echo.
echo Starting preview server...
echo Open http://127.0.0.1:4173/ and keep this window open.
echo.
"C:\Program Files\nodejs\node.exe" ".\node_modules\vite\bin\vite.js" preview --host 127.0.0.1 --port 4173 --strictPort
echo.
echo The preview server stopped or failed to start.
pause
