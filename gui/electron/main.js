import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development' || !app.isPackaged) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle('get-miner-status', async () => {
  return {
    status: 'Running',
    coin: 'Monero (XMR)',
    hashrate: (45.2 + Math.random() * 5).toFixed(1) + ' MH/s',
    temp: '62°C',
    load: '88%',
    devices: [
      { id: 'gpu_0', name: 'AMD Radeon RX 6800', type: 'GPU', enabled: true, hashrate: '32.1 MH/s', temp: '64°C', power: '145W' },
      { id: 'gpu_1', name: 'AMD Radeon RX 6700 XT', type: 'GPU', enabled: true, hashrate: '13.1 MH/s', temp: '58°C', power: '110W' },
      { id: 'cpu_0', name: 'Intel Xeon Processor', type: 'CPU', enabled: true, hashrate: '1.2 MH/s', temp: '48°C', power: '85W' }
    ],
    logs: ["[LOG] AI Switch: XMR -> ETH", "[LOG] Share accepted by pool"]
  };
});

ipcMain.handle('get-analytics', async () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    const base = 10 + Math.random() * 5;
    data.push({ date: `Jan ${14-i}`, aiYield: base + 2, fixedYield: base });
  }
  return data.reverse();
});

ipcMain.handle('set-device-enabled', async (event, { id, enabled }) => {
  console.log(`Device ${id} set to ${enabled}`);
  return { success: true };
});

ipcMain.handle('start-mining', async () => ({ success: true }));
ipcMain.handle('stop-mining', async () => ({ success: true }));
