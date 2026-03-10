import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  LayoutDashboard, Wallet, Settings, Activity, Thermometer, Cpu, Zap, BrainCircuit
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
  const [minerStatus, setMinerStatus] = useState({
    status: 'Initializing...',
    hashrate: '0.0 MH/s',
    temp: '0°C',
    load: '0%'
  });

  useEffect(() => {
    const fetchStatus = async () => {
      if (window.electronAPI) {
        const status = await window.electronAPI.getMinerStatus();
        setMinerStatus(status);
      }
    };
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

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
                <div className="stat-label">GPU Temperature</div>
              </div>
              <div className="card">
                <Cpu className="stat-icon" color="#4ade80" />
                <div className="stat-value">{minerStatus.load}</div>
                <div className="stat-label">System Load</div>
              </div>
              <div className="card">
                <Zap className="stat-icon" color="#facc15" />
                <div className="stat-value">$12.45</div>
                <div className="stat-label">Daily Profit (Est.)</div>
              </div>
            </div>

            <div className="card" style={{ height: '400px' }}>
              <h3 style={{ marginTop: 0 }}>Profitability Trend (AI Optimized)</h3>
              <ResponsiveContainer width="100%" height="90%">
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
                44AFFq5kSiGBo3SBYM76BXDHF... (Hidden)
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
