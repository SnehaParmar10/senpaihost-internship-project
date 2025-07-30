@echo off
echo Starting Tic Tac Toe with AI Bot...
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Node.js serve...
    npx serve . --port 3000
    goto :end
)

:: Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Python HTTP server...
    python -m http.server 8000
    goto :end
)

:: Fallback to opening file directly
echo No suitable server found. Opening file directly...
echo Note: You may encounter CORS issues with the Google API.
echo Consider installing Node.js or Python for better experience.
start index.html

:end
echo.
echo Game started! Check your browser.
pause
