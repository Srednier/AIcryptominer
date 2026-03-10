const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getMinerStatus: () => ipcRenderer.invoke('get-miner-status'),
  getAnalytics: () => ipcRenderer.invoke('get-analytics'),
  setDeviceEnabled: (id, enabled) => ipcRenderer.invoke('set-device-enabled', { id, enabled }),
  startMining: () => ipcRenderer.invoke('start-mining'),
  stopMining: () => ipcRenderer.invoke('stop-mining'),
});
