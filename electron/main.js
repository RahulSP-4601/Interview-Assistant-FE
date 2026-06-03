import { app, BrowserWindow, ipcMain, systemPreferences } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  const preloadPath = path.join(__dirname, 'preload.js');
  console.log('Preload path:', preloadPath);

  mainWindow = new BrowserWindow({
    width: 400,
    height: 280,
    x: 50,
    y: 50,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    movable: true,
    skipTaskbar: true,
    hasShadow: false,
    type: 'panel',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath,
      sandbox: true
    }
  });

  console.log('Window created with preload:', preloadPath);

  // CRITICAL: Highest window level - appears over EVERYTHING including fullscreen
  // Level hierarchy: normal < floating < modal-panel < pop-up-menu < screen-saver
  mainWindow.setAlwaysOnTop(true, 'screen-saver');

  // Show on all spaces/desktops (required for fullscreen support)
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setFullScreenable(false);

  // macOS specific: Hide from dock and set collection behavior
  if (process.platform === 'darwin') {
    app.dock.hide();
    mainWindow.setWindowButtonVisibility(false);
  }

  // Force window to stay on top even when other windows are focused
  mainWindow.on('blur', () => {
    if (mainWindow) {
      mainWindow.setAlwaysOnTop(true, 'screen-saver');
    }
  });

  // Keep checking and re-applying if window loses focus
  const alwaysOnTopInterval = setInterval(() => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.setAlwaysOnTop(true, 'screen-saver');
    }
  }, 1000);

  // OS Invisibility Engine (prevents screen capture)
  mainWindow.setContentProtection(true);

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // Load the /app route directly (hidden overlay interface)
    mainWindow.loadURL('http://localhost:5173/#/app');
    // Don't open DevTools - it interferes with window layering
    // mainWindow.webContents.openDevTools();
  } else {
    // Production: Load the app route directly with hash
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.executeJavaScript(`
        window.location.hash = '#/app';
      `);
    });
  }

  mainWindow.on('closed', () => {
    clearInterval(alwaysOnTopInterval);
    mainWindow = null;
  });

  // After window is ready, apply macOS-specific window level override
  mainWindow.webContents.on('did-finish-load', () => {
    if (process.platform === 'darwin') {
      // Use AppleScript to set window level above fullscreen
      // Use app.getName() to support both dev (Electron) and production (app name)
      const appName = app.getName();
      const script = `
        tell application "System Events"
          set frontmost of process "${appName}" to true
        end tell
      `;
      exec(`osascript -e '${script}'`, (error) => {
        if (error) console.log('AppleScript execution note:', error.message);
      });
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('set-opacity', (event, opacity) => {
  console.log('Received opacity change:', opacity);

  if (!mainWindow) {
    console.warn('Cannot set opacity: mainWindow is null');
    return;
  }

  // Validate opacity value
  const numOpacity = parseFloat(opacity);
  if (!Number.isFinite(numOpacity)) {
    console.warn('Invalid opacity value (not finite):', opacity);
    return;
  }

  // Clamp to [0, 1] range
  const clampedOpacity = Math.max(0, Math.min(1, numOpacity));
  mainWindow.setOpacity(clampedOpacity);
  console.log('Window opacity set to:', clampedOpacity);
});

ipcMain.on('close-window', () => {
  console.log('Close window requested');
  if (mainWindow) {
    mainWindow.close();
    mainWindow = null;
  }
  // Force quit the app completely
  app.quit();
});
