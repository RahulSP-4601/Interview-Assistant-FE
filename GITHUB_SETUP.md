# 🚀 GitHub Setup Guide - Step by Step

## 📋 **Prerequisites:**
- GitHub account (free)
- Git installed on your Mac
- Your code ready to push

---

## 🔧 **Step-by-Step Setup:**

### **Step 1: Create GitHub Repository**

1. Go to https://github.com/new
2. Repository name: `interview-assistant` (or any name you want)
3. Description: "AI-powered interview assistant"
4. Make it **Public** (for free GitHub Actions)
5. **Don't** check "Add README" (we already have files)
6. Click **"Create repository"**

---

### **Step 2: Push Your Code**

```bash
cd /Users/rahulpanchal/Desktop/Project/interview-assistant/interview-assistant-frontend

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Interview Assistant v1.0.0"

# Add GitHub remote (REPLACE with YOUR GitHub username!)
git remote add origin https://github.com/YOUR_USERNAME/interview-assistant.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**⚠️ IMPORTANT:** Replace `YOUR_USERNAME` with your actual GitHub username!

---

### **Step 3: Create First Release**

```bash
# Create version tag
git tag v1.0.0

# Push the tag
git push origin v1.0.0
```

---

### **Step 4: Watch GitHub Actions Build**

1. Go to your repository on GitHub
2. Click **"Actions"** tab at the top
3. You'll see "Build and Release" workflow running
4. Wait 5-10 minutes for it to complete
5. ✅ When done, you'll see green checkmarks

---

### **Step 5: Download Your Installers**

1. Click **"Releases"** tab (right side of GitHub page)
2. Click on `v1.0.0` release
3. Scroll down to **"Assets"** section
4. You'll see:
   - 📦 `Interview Assistant-1.0.0.dmg` (Mac Intel)
   - 📦 `Interview Assistant-1.0.0-arm64.dmg` (Mac Apple Silicon)
   - 📦 `Interview Assistant Setup 1.0.0.exe` (Windows)

---

## 🎉 **That's it!**

Your installers are now available for download!

---

## 📥 **Download URLs:**

After release, your download links will be:

**Mac Intel:**
```
https://github.com/YOUR_USERNAME/interview-assistant/releases/download/v1.0.0/Interview-Assistant-1.0.0.dmg
```

**Mac Apple Silicon:**
```
https://github.com/YOUR_USERNAME/interview-assistant/releases/download/v1.0.0/Interview-Assistant-1.0.0-arm64.dmg
```

**Windows:**
```
https://github.com/YOUR_USERNAME/interview-assistant/releases/download/v1.0.0/Interview-Assistant-Setup-1.0.0.exe
```

---

## 🔄 **Future Releases:**

Every time you want to release a new version:

```bash
# 1. Update version in package.json
# Edit: "version": "1.0.1"

# 2. Commit changes
git add .
git commit -m "Release v1.0.1 - Bug fixes"
git push

# 3. Create new tag
git tag v1.0.1
git push origin v1.0.1

# 4. GitHub Actions automatically builds and creates release!
```

---

## ⚠️ **Important Notes:**

1. **Repository must be PUBLIC** for free GitHub Actions
   - Private repos have limited free minutes
   - Public repos = unlimited builds

2. **Each build takes ~5-10 minutes**
   - Mac build: ~5 min
   - Windows build: ~5 min
   - They run in parallel

3. **GitHub Actions is 100% FREE** for public repos
   - No credit card needed
   - Unlimited builds

---

## 🆘 **Troubleshooting:**

### **"Permission denied" when pushing:**
```bash
# Use SSH instead of HTTPS:
git remote set-url origin git@github.com:YOUR_USERNAME/interview-assistant.git
```

Or use GitHub Personal Access Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate token with `repo` permissions
3. Use token as password when pushing

### **Build fails on GitHub Actions:**
- Click on the failed workflow
- Check the logs for errors
- Common issue: Missing dependencies (but we included everything)

---

## 📝 **Next Steps:**

After your first successful release, you can:
1. Update website download buttons with GitHub release URLs
2. Test installers on different machines
3. Share download links with users

---

**Need help?** Check the Actions tab on GitHub for detailed build logs! 🚀
