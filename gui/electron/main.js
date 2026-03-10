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
    coin: 'Gem (AI PUMP)',
    hashrate: (48.5 + Math.random() * 2).toFixed(1) + ' MH/s',
    temp: '64°C',
    load: '92%',
    devices: [
      { id: 'gpu_0', name: 'AMD Radeon RX 6800', type: 'GPU', enabled: true, hashrate: '35.1 MH/s', temp: '66°C', power: '155W' },
      { id: 'cpu_0', name: 'Intel Xeon Processor', type: 'CPU', enabled: true, hashrate: '1.4 MH/s', temp: '52°C', power: '90W' }
    ],
    logs: ["[NEURAL] Decision: GEM_COIN_PUMP", "[SENTIMENT] Score: 0.89 High Hype detected"]
  };
});

ipcMain.handle('get-ai-brain', async () => {
  return {
    weights: { market: 0.3, sentiment: 0.5, efficiency: 0.2 },
    sentimentHeatmap: [
      { coin: 'ETH', score: 0.4 },
      { coin: 'XMR', score: 0.2 },
      { coin: 'RVN', score: 0.85 },
      { coin: 'KAS', score: 0.92 }
    ],
    efficiencyCurve: [
      { clock: 1800, hashPerWatt: 0.42 },
      { clock: 2000, hashPerWatt: 0.45 },
      { clock: 2200, hashPerWatt: 0.38 }
    ],
    predictions: [
      { target: 'Fan Health', status: 'Optimal', confidence: '98%' },
      { target: 'Next Coin', status: 'RVN', confidence: '82%' }
    ]
  };
});

ipcMain.handle('get-analytics', async () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    const base = 10 + Math.random() * 5;
    data.push({ date: `Jan ${14-i}`, aiYield: base + 4, fixedYield: base });
  }
  return data.reverse();
});

ipcMain.handle('set-device-enabled', async () => ({ success: true }));
ipcMain.handle('start-mining', async () => ({ success: true }));
ipcMain.handle('stop-mining', async () => ({ success: true }));
