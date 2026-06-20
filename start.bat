@echo off
title QuizMaster Pro - Dev Server
echo.
echo  ========================================
echo   QuizMaster Pro - Starting Dev Server
echo  ========================================
echo.

:: Check if node_modules exists, install if not
if not exist "node_modules\" (
    echo  [*] Installing dependencies...
    echo.
    call npm install
    echo.
)

echo  [*] Starting dev server...
echo  [*] Opening http://localhost:5173 in your browser...
echo.

:: Open browser after a short delay
start "" "http://localhost:5173"

:: Start the dev server
call npm run dev

pause
