const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload script loaded successfully');

contextBridge.exposeInMainWorld('electronAPI', {
  setOpacity: (opacity) => {
    console.log('Setting opacity to:', opacity);
    ipcRenderer.send('set-opacity', opacity);
  },
  closeWindow: () => {
    console.log('Closing window');
    ipcRenderer.send('close-window');
  }
});
