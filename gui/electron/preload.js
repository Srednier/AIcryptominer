const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getMinerStatus: () => ipcRenderer.invoke('get-miner-status'),
});
