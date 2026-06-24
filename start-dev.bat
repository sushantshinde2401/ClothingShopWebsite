@echo off
title Mad'ora dev server
cd /d "%~dp0"
echo Starting Mad'ora dev server...
echo.
echo When it says "Local: http://127.0.0.1:5173/", keep this window open.
echo Press Ctrl+C in this window to stop the server.
echo.
set "VITE_CACHE_DIR=%TEMP%\madora-vite-cache-%RANDOM%"
"C:\Program Files\nodejs\node.exe" ".\node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 5173 --strictPort
echo.
echo The dev server stopped or failed to start.
pause
