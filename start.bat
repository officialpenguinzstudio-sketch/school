@echo off
title QuizMaster Pro - Dev Server

:: Change to the directory where this batch file lives
cd /d "%~dp0"

echo.
echo  ========================================
echo   QuizMaster Pro - Starting Dev Server
echo  ========================================
echo.

:: Check if Node.js is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [!] ERROR: Node.js is not installed or not in PATH.
    echo  [!] Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: Check if node_modules exists, install if not
if not exist "node_modules\" (
    echo  [*] Installing dependencies...
    echo.
    call npm.cmd install
    if %errorlevel% neq 0 (
        echo.
        echo  [!] ERROR: npm install failed.
        echo.
        pause
        exit /b 1
    )
    echo.
)

echo  [*] Starting dev server...
echo  [*] The browser will open automatically.
echo  [*] Press Ctrl+C to stop the server.
echo.

:: Open the browser after a short delay (gives server time to start)
start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"

:: Start the dev server (this blocks until Ctrl+C)
call npm.cmd run dev

:: If we get here, the server was stopped
echo.
echo  [*] Dev server stopped.
pause
