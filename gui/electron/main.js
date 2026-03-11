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

app.whenReady().then(() => createWindow());

ipcMain.handle('get-miner-status', async () => {
  return {
    status: 'Running', coin: 'ETH/XMR', hashrate: '52.1 MH/s', temp: '64°C', load: '92%', devices: [], logs: ["[MULTI] GPU Agent: Switching to ETH_HIGH_PROFIT", "[MULTI] CPU Agent: Staying on XMR_STABLE"]
  };
});

ipcMain.handle('get-ai-brain', async () => {
  const curveGPU = [];
  const curveCPU = [];
  for (let i = 0; i < 20; i++) {
    curveGPU.push({ step: i, reward: 0.5 + Math.log(i + 1) * 0.25 });
    curveCPU.push({ step: i, reward: 0.3 + Math.log(i + 1) * 0.15 });
  }

  return {
    weights: { market: 0.35, sentiment: 0.45, efficiency: 0.20 },
    epsilon: '0.125',
    multiModel: {
      gpu: { name: 'GPU Specialist', algo: 'DQN', status: 'Yield Optimization', curve: curveGPU },
      cpu: { name: 'CPU Specialist', algo: 'PPO', status: 'Efficiency Tuning', curve: curveCPU }
    },
    trainingStatus: 'Multi-Agent Sync Active',
    predictions: [
      { target: 'GPU Yield', status: 'Peak', confidence: '92%' },
      { target: 'CPU Temp', status: 'Stable', confidence: '99%' }
    ]
  };
});

ipcMain.handle('get-analytics', async () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    const base = 10 + Math.random() * 5;
    data.push({ date: `Jan ${14-i}`, aiYield: base + 6, fixedYield: base });
  }
  return data.reverse();
});

ipcMain.handle('set-device-enabled', async () => ({ success: true }));
ipcMain.handle('start-mining', async () => ({ success: true }));
ipcMain.handle('stop-mining', async () => ({ success: true }));
