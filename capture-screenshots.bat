@echo off
echo ================================================
echo     Real Screenshot Capture Helper
echo ================================================
echo.

echo 📸 This script will help you capture real screenshots of your Tic Tac Toe project
echo.

echo 🚀 Step 1: Opening live project...
start "" "https://snehaparmar10.github.io/senpaihost-internship-project/"
echo ✅ Project opened in browser
echo.

echo 📋 Step 2: Screenshot Instructions
echo.
echo 🖼️ Screenshots to capture:
echo    1. Main game interface (homepage)
echo    2. Game in progress (with X and O moves)
echo    3. AI difficulty selection
echo    4. Winner announcement screen
echo.

echo 💡 How to take screenshots:
echo    • Windows 10/11: Windows Key + Shift + S
echo    • Alternative: Alt + Print Screen
echo    • Or use Snipping Tool from Start menu
echo.

echo 📁 Where to save:
echo    • Save in this folder: %~dp0
echo    • Filename 1: project-main-screenshot.png
echo    • Filename 2: game-playing-screenshot.png  
echo    • Filename 3: ai-selection-screenshot.png
echo    • Filename 4: winner-screen-screenshot.png
echo.

echo 🎯 Tips for best screenshots:
echo    ✅ Use full browser window
echo    ✅ Include URL bar to show it's live
echo    ✅ Capture different game states
echo    ✅ Show responsive design (try mobile view)
echo    ✅ Demonstrate AI features
echo.

pause

echo.
echo 🔄 Step 3: After capturing screenshots...
echo.
echo Once you have captured the screenshots:
echo 1. Save them in this project folder
echo 2. Run 'update-report-screenshots.bat' to update the report
echo 3. Run 'generate-pdf.bat' to create PDF with real images
echo.

echo 📱 Pro tip: Also capture mobile responsive view
echo    - Press F12 in browser
echo    - Click mobile/tablet icon
echo    - Take screenshot of mobile layout
echo.

echo ✨ Ready to capture screenshots!
echo Press any key when you've finished capturing...
pause

echo.
echo 🎉 Great! Now let's update the report with your real screenshots...
echo.
pause
