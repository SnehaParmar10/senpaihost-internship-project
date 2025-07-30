@echo off
echo ================================================
echo   GitHub Setup for Sneha Parmar (SnehaParmar10)
echo   SenpaiHost Internship Project Setup
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

REM Get Sneha's email
set /p GITHUB_EMAIL="Enter Sneha's email address for commits: "

echo.
echo ================================================
echo   Configuring Git for Sneha Parmar
echo ================================================
echo   GitHub Username: SnehaParmar10
echo   Email: %GITHUB_EMAIL%
echo   Repository: senpaihost-internship-project
echo ================================================
echo.

REM Configure Git for this project
git config user.name "Sneha Parmar"
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
echo Adding all project files to Git...
git add .

echo.
echo Creating initial commit...
git commit -m "🎉 Initial commit: Sneha's SenpaiHost Internship Project

🎮 Tic Tac Toe Pro [PROTOTYPE]
🤖 AI-powered game with Google Gemini integration
🎨 Premium UI/UX with glassmorphism design
📱 Responsive and accessible web application
🔊 Professional sound effects using Web Audio API
📋 Comprehensive internship documentation

👩‍💻 Intern: Sneha Parmar (SnehaParmar10)
🏢 Company: SenpaiHost
📅 Duration: 2 June - 2 August 2025
💼 Position: Web Developer Intern
🏭 Department: Technology & Development

© 2025 SenpaiHost - All rights reserved
Prototype developed during internship program"

if errorlevel 1 (
    echo ⚠️  Some files may already be committed
) else (
    echo ✅ Initial commit created successfully
)

echo.

REM Set up remote repository
set REPO_URL=https://github.com/SnehaParmar10/senpaihost-internship-project.git
echo Setting up remote repository...
echo Repository URL: %REPO_URL%

git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo ✅ Remote repository configured
echo.

echo ================================================
echo           🎉 Setup Complete! 
echo ================================================
echo.
echo ✅ Next steps for Sneha:
echo.
echo 1. 🌐 Go to: https://github.com/SnehaParmar10
echo 2. ➕ Click "New repository" 
echo 3. 📝 Repository name: senpaihost-internship-project
echo 4. 📄 Description: AI-powered Tic Tac Toe Pro [PROTOTYPE] - Sneha's 2-month Web Developer Internship at SenpaiHost (June-August 2025)
echo 5. 🔓 Make it Public (for portfolio)
echo 6. ❌ Don't initialize with README (we have files)
echo 7. ✅ Create repository
echo 8. 🚀 Run: git push -u origin main
echo.
echo 🌐 Once pushed, the project will be available at:
echo    https://github.com/SnehaParmar10/senpaihost-internship-project
echo.
echo 📄 For GitHub Pages hosting, enable Pages in repository settings
echo 🔗 Live demo will be at: https://SnehaParmar10.github.io/senpaihost-internship-project
echo.
echo 📚 For detailed instructions, see GITHUB_SETUP.md
echo.
pause
