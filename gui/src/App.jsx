import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  LayoutDashboard, Wallet, Settings, Activity, Thermometer, Cpu, Zap, BrainCircuit, Play, Square, ShieldAlert, Terminal
} from 'lucide-react';
import './App.css';

const mockChartData = [
  { time: '10:00', profit: 12.5 },
  { time: '10:05', profit: 13.2 },
  { time: '10:10', profit: 12.8 },
  { time: '10:15', profit: 14.5 },
  { time: '10:20', profit: 15.1 },
  { time: '10:25', profit: 14.8 },
  { time: '10:30', profit: 16.2 },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMining, setIsMining] = useState(false);
  const [minerStatus, setMinerStatus] = useState({
    status: 'Ready',
    coin: 'None',
    pool: 'None',
    hashrate: '0.0 MH/s',
    temp: '0°C',
    load: '0%',
    logs: []
  });

  useEffect(() => {
    let interval;
    if (isMining) {
      const fetchStatus = async () => {
        if (window.electronAPI) {
          const status = await window.electronAPI.getMinerStatus();
          setMinerStatus(status);
        }
      };
      fetchStatus();
      interval = setInterval(fetchStatus, 3000);
    } else {
      setMinerStatus(prev => ({ ...prev, status: 'Ready', hashrate: '0.0 MH/s' }));
    }
    return () => clearInterval(interval);
  }, [isMining]);

  const toggleMining = async () => {
    if (isMining) {
      await window.electronAPI.stopMining();
      setIsMining(false);
    } else {
      await window.electronAPI.startMining();
      setIsMining(true);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BrainCircuit color="#38bdf8" size={32} />
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>AI Miner</h2>
        </div>

        <nav>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'wallet' ? 'active' : ''}`} onClick={() => setActiveTab('wallet')}>
            <Wallet size={20} /> Wallet
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Settings
          </div>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button
            className={`btn ${isMining ? 'btn-stop' : 'btn-start'}`}
            onClick={toggleMining}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {isMining ? <Square size={18} /> : <Play size={18} />}
            {isMining ? 'Stop Mining' : 'Start Mining'}
          </button>
        </div>
      </aside>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="grid-stats">
              <div className="card">
                <Activity className="stat-icon" color="#38bdf8" />
                <div className="stat-value">{minerStatus.hashrate}</div>
                <div className="stat-label">Total Hashrate</div>
              </div>
              <div className="card">
                <Thermometer className="stat-icon" color="#fb923c" />
                <div className="stat-value">{minerStatus.temp}</div>
                <div className="stat-label">GPU Temp</div>
              </div>
              <div className="card">
                <Cpu className="stat-icon" color="#4ade80" />
                <div className="stat-value">{minerStatus.load}</div>
                <div className="stat-label">System Load</div>
              </div>
              <div className="card">
                <BrainCircuit className="stat-icon" color="#a855f7" />
                <div className="stat-value">{minerStatus.coin === 'None' ? 'Idle' : minerStatus.coin}</div>
                <div className="stat-label">Active Coin</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="card" style={{ height: '300px' }}>
                <h3 style={{ marginTop: 0 }}>AI Optimization Trend</h3>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={mockChartData}>
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                      itemStyle={{ color: '#38bdf8' }}
                    />
                    <Area type="monotone" dataKey="profit" stroke="#38bdf8" fillOpacity={1} fill="url(#colorProfit)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Terminal size={18} /> Live Miner Logs
                </h3>
                <div style={{
                  flex: 1,
                  background: '#0f172a',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  overflowY: 'auto',
                  color: '#94a3b8'
                }}>
                  {minerStatus.logs.map((log, i) => (
                    <div key={i} style={{ marginBottom: '0.25rem' }}>{log}</div>
                  ))}
                  {minerStatus.logs.length === 0 && <div style={{ opacity: 0.5 }}>Waiting for miner to start...</div>}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'wallet' && (
          <div className="card">
            <h2>Wallet Management</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="stat-label">Ethereum Address</label>
              <div className="stat-value" style={{ fontSize: '1rem', background: '#0f172a', padding: '1rem', borderRadius: '0.5rem' }}>
                0x71C7656EC7ab88b098defB751B7401B5f6d8976F
              </div>
            </div>
            <div>
              <label className="stat-label">Monero Address</label>
              <div className="stat-value" style={{ fontSize: '1rem', background: '#0f172a', padding: '1rem', borderRadius: '0.5rem' }}>
                44AFFq5kSiGBo3SBYM76BXDHF... (Demo Only)
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldAlert color="#facc15" /> Security & Antivirus
            </h2>
            <p style={{ color: '#94a3b8' }}>
              Mining software is often incorrectly flagged as a virus by Windows Defender and other Antivirus software.
              To ensure stable operation, please follow these steps:
            </p>
            <ul style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              <li>Open <strong>Windows Security</strong> settings.</li>
              <li>Go to <strong>Virus & threat protection</strong>.</li>
              <li>Under <strong>Exclusions</strong>, select <strong>Add or remove exclusions</strong>.</li>
              <li>Click <strong>Add an exclusion</strong> and select the folder where you installed this miner.</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
