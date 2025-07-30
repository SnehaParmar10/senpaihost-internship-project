# 🔗 GitHub Setup Guide for Sneha's Account

This guide will help set up this SenpaiHost internship project on **Sneha's GitHub account**.

## 📋 Prerequisites

1. **Sneha's GitHub Account**: Ensure Sneha has a GitHub account created
2. **Git Installation**: Make sure Git is installed on the computer
3. **Project Files**: All project files are ready in this directory

## 🚀 Step-by-Step Setup

### Step 1: Configure Git with Sneha's Details

```bash
# Set Sneha's name and email for this project
git config user.name "Sneha"
git config user.email "sneha@example.com"  # Replace with Sneha's actual email

# Or set globally if this is Sneha's computer
git config --global user.name "Sneha"
git config --global user.email "sneha@example.com"
```

### Step 2: Initialize Git Repository

```bash
# Navigate to project directory
cd "c:\Users\harsh\Downloads\sneha-github"

# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
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
```

### Step 3: Create Repository on Sneha's GitHub

1. **Log into Sneha's GitHub account** at https://github.com
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in repository details:**
   - **Repository name**: `senpaihost-internship-project`
   - **Description**: `🎮 AI-powered Tic Tac Toe Pro [PROTOTYPE] - Sneha's 2-month Web Developer Internship at SenpaiHost (June-August 2025)`
   - **Visibility**: 
     - ✅ **Public** (recommended for portfolio/internship showcase)
     - OR Private (if SenpaiHost requires confidentiality)
   - **Initialize**: Leave unchecked (we already have files)

### Step 4: Connect Local Repository to Sneha's GitHub

```bash
# Add Sneha's GitHub repository as remote origin
git remote add origin https://github.com/SnehaParmar10/senpaihost-internship-project.git

# This is Sneha's actual GitHub username: SnehaParmar10
```

### Step 5: Push to Sneha's GitHub Repository

```bash
# Push the code to Sneha's GitHub
git branch -M main
git push -u origin main
```

## 🔐 Authentication Options

### Option A: Personal Access Token (Recommended)
1. Go to **GitHub Settings** → **Developer settings** → **Personal access tokens**
2. **Generate new token** with `repo` permissions
3. **Use token as password** when prompted during git push

### Option B: GitHub CLI
```bash
# Install GitHub CLI and authenticate
gh auth login
# Follow prompts to authenticate with Sneha's account
```

### Option C: SSH Keys
```bash
# Generate SSH key for Sneha's account
ssh-keygen -t ed25519 -C "sneha@example.com"

# Add SSH key to Sneha's GitHub account
# Copy public key and add to GitHub Settings → SSH and GPG keys
```

## 📁 Repository Structure

```
senpaihost-internship-project/
├── 📄 index.html                 # Main game application
├── 📄 internship-report.html     # Comprehensive internship report
├── 🎨 styles.css                 # Main stylesheet
├── 🎨 report-styles.css          # Report-specific styles
├── ⚡ script.js                  # Game logic and AI integration
├── 🔊 sounds.js                  # Web Audio API implementation
├── ⚙️ config.js                  # Configuration and API keys
├── 📦 package.json               # Project metadata
├── 📋 README.md                  # Project documentation
├── 📜 LICENSE                    # SenpaiHost proprietary license
├── 🚀 start.bat                  # Quick start script
├── 📁 .vscode/                   # VS Code settings
└── 📋 GITHUB_SETUP.md           # This setup guide
```

## 🎯 Repository Settings Recommendations

### Repository Details
- **Description**: `🎮 AI-powered Tic Tac Toe Pro [PROTOTYPE] - Sneha's 2-month Web Developer Internship at SenpaiHost (June-August 2025)`
- **Website**: `https://SnehaParmar10.github.io/senpaihost-internship-project` (if using GitHub Pages)
- **Topics**: `internship`, `web-development`, `ai-game`, `senpaihost`, `prototype`, `tic-tac-toe`, `google-gemini`, `javascript`, `html5`, `css3`

### README Badge Suggestions
Add these badges to the top of README.md:

```markdown
![Internship Project](https://img.shields.io/badge/Project-Internship-blue)
![Company](https://img.shields.io/badge/Company-SenpaiHost-green)
![Duration](https://img.shields.io/badge/Duration-2%20Months-orange)
![Status](https://img.shields.io/badge/Status-Completed-success)
![Prototype](https://img.shields.io/badge/Type-Prototype-red)
```

## 🌐 GitHub Pages Setup (Optional)

To host the live demo on GitHub Pages:

1. **Go to repository Settings**
2. **Scroll to Pages section**
3. **Select Source**: Deploy from a branch
4. **Select Branch**: main
5. **Select Folder**: / (root)
6. **Save**

The project will be live at: `https://SnehaParmar10.github.io/senpaihost-internship-project`

## 📝 Commit Message Guidelines

Use descriptive commit messages following this format:

```bash
# Feature additions
git commit -m "✨ Add Google Gemini AI integration"

# Bug fixes  
git commit -m "🐛 Fix responsive layout on mobile devices"

# Documentation updates
git commit -m "📚 Update internship report with learning outcomes"

# Style improvements
git commit -m "💄 Improve glassmorphism effects and animations"

# Performance improvements
git commit -m "⚡ Optimize audio loading and game performance"
```

## 🔄 Future Updates

To update the repository with new changes:

```bash
# Pull latest changes (if working with others)
git pull origin main

# Add new/modified files
git add .

# Commit changes
git commit -m "📝 Update project documentation"

# Push to GitHub
git push origin main
```

## 🏢 SenpaiHost Attribution

Ensure all commits and documentation properly attribute the work to SenpaiHost:

- **Author**: Sneha (SenpaiHost Intern)
- **Copyright**: © 2025 SenpaiHost - All rights reserved
- **Project Type**: Internship Prototype
- **Ownership**: SenpaiHost intellectual property

## 📞 Support

If you encounter issues:

1. **Check Git configuration**: `git config --list`
2. **Verify remote URL**: `git remote -v`
3. **Check GitHub authentication**: `gh auth status`
4. **Review GitHub documentation**: https://docs.github.com

## ✅ Verification Checklist

- [ ] Git configured with Sneha's name and email
- [ ] Repository created on Sneha's GitHub account  
- [ ] Local repository connected to Sneha's remote
- [ ] All files committed and pushed successfully
- [ ] Repository description and topics set appropriately
- [ ] README.md displays correctly on GitHub
- [ ] GitHub Pages configured (if desired)
- [ ] SenpaiHost attribution visible in all documentation

---

**🎉 Once completed, Sneha will have her own GitHub repository showcasing her SenpaiHost internship project!**

This repository will serve as an excellent portfolio piece demonstrating her web development skills, AI integration capabilities, and professional project delivery during her internship at SenpaiHost.
