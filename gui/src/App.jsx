import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend
} from 'recharts';
import {
  LayoutDashboard, Wallet, Settings, Activity, Thermometer, Cpu, Zap, BrainCircuit, Play, Square, ShieldAlert, Terminal, BarChart3, HardDrive, Bell
} from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMining, setIsMining] = useState(false);
  const [minerStatus, setMinerStatus] = useState({
    status: 'Ready',
    coin: 'None',
    hashrate: '0.0 MH/s',
    temp: '0°C',
    load: '0%',
    devices: [],
    logs: []
  });
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      if (window.electronAPI) {
        const status = await window.electronAPI.getMinerStatus();
        setMinerStatus(status);
        const history = await window.electronAPI.getAnalytics();
        setAnalytics(history);
      }
    };

    if (isMining) {
      fetchData();
      interval = setInterval(fetchData, 3000);
    }
    return () => clearInterval(interval);
  }, [isMining]);

  const toggleMining = async () => {
    setIsMining(!isMining);
  };

  const toggleDevice = async (id, current) => {
    await window.electronAPI.setDeviceEnabled(id, !current);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BrainCircuit color="#38bdf8" size={32} />
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>AI Miner Pro</h2>
        </div>

        <nav>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'devices' ? 'active' : ''}`} onClick={() => setActiveTab('devices')}>
            <HardDrive size={20} /> Devices
          </div>
          <div className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
            <BarChart3 size={20} /> Analytics
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} /> Settings
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button className={`btn ${isMining ? 'btn-stop' : 'btn-start'}`} onClick={toggleMining} style={{ width: '100%' }}>
            {isMining ? 'Stop Mining' : 'Start Mining'}
          </button>
        </div>
      </aside>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="grid-stats">
              <div className="card"><Activity color="#38bdf8" /><div className="stat-value">{minerStatus.hashrate}</div><div className="stat-label">Total Hashrate</div></div>
              <div className="card"><Thermometer color="#fb923c" /><div className="stat-value">{minerStatus.temp}</div><div className="stat-label">Max Temp</div></div>
              <div className="card"><Cpu color="#4ade80" /><div className="stat-value">{minerStatus.load}</div><div className="stat-label">System Load</div></div>
              <div className="card"><BrainCircuit color="#a855f7" /><div className="stat-value">{isMining ? 'Active' : 'Idle'}</div><div className="stat-label">AI Strategy</div></div>
            </div>

            <div className="card" style={{ height: '350px' }}>
              <h3>AI Performance vs Fixed Mining</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                  <Legend />
                  <Line type="monotone" dataKey="aiYield" stroke="#38bdf8" name="AI Optimized ($/day)" strokeWidth={3} />
                  <Line type="monotone" dataKey="fixedYield" stroke="#94a3b8" name="Fixed Coin ($/day)" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'devices' && (
          <div className="card">
            <h2>Hardware Management</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {minerStatus.devices.map(device => (
                <div key={device.id} className="card" style={{ margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a' }}>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{device.name}</div>
                    <div className="stat-label">{device.type} | {device.temp} | {device.power}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="stat-value" style={{ fontSize: '1.2rem' }}>{device.hashrate}</div>
                    <input
                      type="checkbox"
                      checked={device.enabled}
                      onChange={() => toggleDevice(device.id, device.enabled)}
                      style={{ width: '20px', height: '20px', accentColor: '#38bdf8' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="card">
            <h2>Detailed Analytics</h2>
            <div className="grid-stats" style={{ marginBottom: '2rem' }}>
              <div className="card" style={{ background: '#0f172a' }}>
                <div className="stat-value" style={{ color: '#4ade80' }}>+18.5%</div>
                <div className="stat-label">AI Efficiency Boost</div>
              </div>
              <div className="card" style={{ background: '#0f172a' }}>
                <div className="stat-value">$142.30</div>
                <div className="stat-label">Monthly Est. Revenue</div>
              </div>
            </div>
            <p className="stat-label">AI Strategy focuses on minimizing power costs during peak hours and switching to low-difficulty gems.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card">
              <h3><Bell size={18} /> Notifications</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label className="stat-label">Discord Webhook URL</label>
                <input type="text" className="input-field" placeholder="https://discord.com/api/webhooks/..." />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="checkbox" defaultChecked /> <span className="stat-label">Notify on coin switch</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="checkbox" defaultChecked /> <span className="stat-label">Alert on overheat (&gt;85°C)</span>
              </div>
            </div>

            <div className="card">
              <h3><Zap size={18} /> Profitability Safeguard</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label className="stat-label">Electricity Cost ($/kWh)</label>
                <input type="number" className="input-field" defaultValue="0.12" />
              </div>
              <p className="stat-label" style={{ fontSize: '0.75rem' }}>The miner will automatically pause if the estimated profit per hour drops below your electricity cost.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
