# 🚀 Building & Releasing Interview Assistant

## 📦 Automatic Builds with GitHub Actions

This project uses GitHub Actions to automatically build installers for **macOS** and **Windows**.

---

## ✅ **How It Works:**

1. **Push your code to GitHub**
2. **Create a version tag** (e.g., `v1.0.0`)
3. **GitHub Actions automatically:**
   - Builds on macOS runner → Creates `.dmg` files
   - Builds on Windows runner → Creates `.exe` installer
   - Creates a GitHub Release with all installers attached

---

## 🏷️ **How to Create a Release:**

### **Step 1: Push your code to GitHub**

```bash
cd interview-assistant-frontend

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial release"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/interview-assistant.git
git branch -M main
git push -u origin main
```

### **Step 2: Create a version tag**

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

### **Step 3: Wait for GitHub Actions to build**

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Watch the build progress (takes ~5-10 minutes)
4. When complete, go to **"Releases"** tab
5. Download your installers! 🎉

---

## 📥 **What Gets Built:**

- **macOS Intel**: `Interview Assistant-1.0.0.dmg` (~110 MB)
- **macOS Apple Silicon**: `Interview Assistant-1.0.0-arm64.dmg` (~105 MB)
- **Windows**: `Interview Assistant Setup 1.0.0.exe` (~120 MB)

---

## 🔧 **Manual Build (Local)**

If you want to build locally:

### **On macOS (your machine):**
```bash
npm run electron:build
# Creates Mac .dmg files in release/
```

### **On Windows (requires Windows PC):**
```bash
npm run electron:build
# Creates Windows .exe in release/
```

---

## 🎯 **Version Numbering:**

Update version in `package.json`:

```json
{
  "version": "1.0.0"  // Change this
}
```

Then create matching git tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## 📝 **Release Checklist:**

- [ ] All bugs fixed and tested
- [ ] Version updated in `package.json`
- [ ] Code committed and pushed to GitHub
- [ ] Git tag created and pushed
- [ ] GitHub Actions build successful
- [ ] Installers tested on Mac and Windows
- [ ] Release notes written

---

## 🆘 **Troubleshooting:**

### **Build fails on GitHub Actions:**
- Check the Actions tab for error logs
- Ensure `package.json` has `description` and `author`
- Verify all dependencies are in `package.json`

### **Windows build fails:**
- This is expected on local Mac builds
- Use GitHub Actions for Windows builds

### **Download URLs:**
After release is created, installers are available at:
```
https://github.com/YOUR_USERNAME/interview-assistant/releases/download/v1.0.0/Interview-Assistant-1.0.0.dmg
```

---

## 🎉 **That's it!**

Every time you push a new version tag, GitHub Actions automatically builds and releases installers for both Mac and Windows! 🚀
