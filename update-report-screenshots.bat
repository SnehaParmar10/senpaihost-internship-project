@echo off
echo ================================================
echo   Update Report with Real Screenshots
echo ================================================
echo.

echo 🔍 Checking for screenshot files...

if exist "project-main-screenshot.png" (
    echo ✅ Found: project-main-screenshot.png
) else (
    echo ❌ Missing: project-main-screenshot.png
)

if exist "game-playing-screenshot.png" (
    echo ✅ Found: game-playing-screenshot.png
) else (
    echo ❌ Missing: game-playing-screenshot.png
)

if exist "ai-selection-screenshot.png" (
    echo ✅ Found: ai-selection-screenshot.png
) else (
    echo ❌ Missing: ai-selection-screenshot.png
)

if exist "winner-screen-screenshot.png" (
    echo ✅ Found: winner-screen-screenshot.png
) else (
    echo ❌ Missing: winner-screen-screenshot.png
)

echo.
echo 📝 To manually update the report with real screenshots:
echo.
echo 1. Open 'internship-report-pdf.html' in a text editor
echo.
echo 2. Find these lines and replace the URLs:
echo    
echo    FIND: src="https://snehaparmar10.github.io/senpaihost-internship-project/screenshot.png"
echo    REPLACE: src="./project-main-screenshot.png"
echo.
echo    FIND: src="https://snehaparmar10.github.io/senpaihost-internship-project/demo-screenshot.png" 
echo    REPLACE: src="./game-playing-screenshot.png"
echo.
echo 3. Save the file
echo.
echo 4. Run 'generate-pdf.bat' to create PDF with real images
echo.

echo 💡 Alternative: Use the GitHub repository to host images
echo    1. Upload screenshots to your GitHub repo
echo    2. Use GitHub raw URLs in the report
echo    3. Format: https://raw.githubusercontent.com/SnehaParmar10/senpaihost-internship-project/main/screenshot.png
echo.

echo 🎯 Best practice for professional reports:
echo    ✅ Use high-resolution screenshots (1920x1080 or higher)
echo    ✅ Show different features of your application
echo    ✅ Include before/after states (game start vs game end)
echo    ✅ Demonstrate responsive design on different devices
echo.

pause

echo.
echo 📂 Opening project folder so you can verify your screenshots...
start "" "%~dp0"
echo.
echo 🚀 Opening report file for manual editing if needed...
start "" "internship-report-pdf.html"
echo.

pause
