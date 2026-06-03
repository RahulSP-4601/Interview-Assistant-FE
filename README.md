# Interview Assistant Frontend

Desktop application for Interview Assistant built with React, TypeScript, Tailwind CSS, and Electron.

## Tech Stack

- **Frontend**: React.js + TypeScript
- **Styling**: Tailwind CSS
- **Desktop Wrapper**: Electron
- **Build Tool**: Vite
- **Audio Capture**: BlackHole (macOS) / VB-Cable (Windows)
- **Screen OCR**: Tesseract.js

## Features

- **OS Invisibility**: `win.setContentProtection(true)`
- **Click-Through Mode**: `win.setIgnoreMouseEvents(true)`
- **Audio Loopback Capture**
- **Local Screen OCR**

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development (web only):
```bash
npm run dev
```

3. Run Electron development mode:
```bash
npm run electron:dev
```

4. Build desktop app:
```bash
npm run electron:build
```

## Project Structure

```
src/
├── components/       # React components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── services/        # API services
└── utils/           # Utility functions

electron/
├── main.js          # Electron main process
└── preload.js       # Preload script
```

## Development

- Web Dev Server: http://localhost:5173
- Hot reload enabled for both Vite and Electron
