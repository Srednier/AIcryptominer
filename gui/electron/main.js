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
    status: 'Running', coin: 'XMR', hashrate: '52.1 MH/s', temp: '64°C', load: '92%', devices: [], logs: ["[NEURAL] Exploration Mode enabled", "[NEURAL] Training batch complete"]
  };
});

ipcMain.handle('get-ai-brain', async () => {
  const curve = [];
  for (let i = 0; i < 20; i++) {
    curve.push({ step: i, reward: 0.5 + Math.log(i + 1) * 0.2 + Math.random() * 0.1 });
  }

  return {
    weights: { market: 0.3, sentiment: 0.5, efficiency: 0.2 },
    epsilon: (0.3 - 0.005 * 10).toFixed(3),
    learningCurve: curve,
    trainingStatus: 'Optimizing Weights (Batch #42)',
    predictions: [
      { target: 'Model Loss', status: '0.042 (Stable)', confidence: '99%' },
      { target: 'Learning Rate', status: '0.01', confidence: 'N/A' }
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
