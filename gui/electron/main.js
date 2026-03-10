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

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Simulated interaction with the C++ backend
// In a real environment, this would use a child process to launch the C++ backend
// and talk to it via JSON-RPC over stdout/stdin or a socket.
ipcMain.handle('get-miner-status', async () => {
  return {
    status: 'Running',
    coin: 'Monero (XMR)',
    pool: 'moneroocean.stream:10128',
    hashrate: (45.2 + Math.random() * 5).toFixed(1) + ' MH/s',
    temp: (60 + Math.random() * 10).toFixed(0) + '°C',
    load: (85 + Math.random() * 15).toFixed(0) + '%',
    logs: [
      "[2026-01-14 12:00:01] Connected to pool",
      "[2026-01-14 12:00:05] New job from moneroocean.stream",
      "[2026-01-14 12:00:10] Accepted share (32ms)",
      "[2026-01-14 12:00:15] AI Optimized: switching difficulty..."
    ]
  };
});

ipcMain.handle('start-mining', async () => {
  console.log('Starting mining via backend...');
  return { success: true };
});

ipcMain.handle('stop-mining', async () => {
  console.log('Stopping mining via backend...');
  return { success: true };
});
