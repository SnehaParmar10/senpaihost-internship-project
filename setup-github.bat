@echo off
echo ================================================
echo   GitHub Setup for Sneha's SenpaiHost Project
echo ================================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/download/windows
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Get Sneha's GitHub details
set GITHUB_USERNAME=SnehaParmar10
set /p GITHUB_EMAIL="Enter Sneha's email address: "

echo.
echo Setting up for Sneha's GitHub account: %GITHUB_USERNAME%
echo Configuring Git for Sneha...

REM Configure Git for this project
git config user.name "Sneha"
git config user.email "%GITHUB_EMAIL%"

echo ✅ Git configured with Sneha's details
echo.

REM Initialize repository if not already done
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

echo.
echo Adding files to Git...
git add .

echo.
echo Creating initial commit...
git commit -m "🎉 Initial commit: Sneha's SenpaiHost Internship Project - Tic Tac Toe Pro [PROTOTYPE]

✨ Features implemented:
- AI-powered Tic Tac Toe game with Google Gemini integration
- Premium UI/UX with glassmorphism design  
- Responsive layout and accessibility features
- Professional sound effects using Web Audio API
- Comprehensive internship report documentation

🏢 Project Details:
- Intern: Sneha
- Company: SenpaiHost  
- Duration: 2 June - 2 August 2025
- Position: Web Developer Intern
- Department: Technology & Development

© 2025 SenpaiHost - All rights reserved"

echo ✅ Initial commit created
echo.

REM Set up remote repository
set REPO_URL=https://github.com/%GITHUB_USERNAME%/senpaihost-internship-project.git
echo Setting up remote repository...
echo Repository URL: %REPO_URL%

git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo ✅ Remote repository configured
echo.

echo ================================================
echo           Setup Complete! 
echo ================================================
echo.
echo Next steps:
echo 1. Create repository 'senpaihost-internship-project' on Sneha's GitHub account
echo 2. Run: git push -u origin main
echo.
echo Repository URL: %REPO_URL%
echo.
echo For detailed instructions, see GITHUB_SETUP.md
echo.
pause
