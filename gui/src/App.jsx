import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import {
  LayoutDashboard, Wallet, Settings, Activity, Thermometer, Cpu, Zap, BrainCircuit, Play, Square, ShieldAlert, Terminal, BarChart3, HardDrive, Bell, Eye, TrendingUp, AlertTriangle
} from 'lucide-react';
import './App.css';

const COLORS = ['#38bdf8', '#a855f7', '#4ade80', '#fb923c'];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMining, setIsMining] = useState(false);
  const [minerStatus, setMinerStatus] = useState({
    status: 'Ready', coin: 'None', hashrate: '0.0 MH/s', temp: '0°C', load: '0%', devices: [], logs: []
  });
  const [aiBrain, setAIBrain] = useState(null);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      if (window.electronAPI) {
        const status = await window.electronAPI.getMinerStatus();
        setMinerStatus(status);
        const brain = await window.electronAPI.getAIBrain();
        setAIBrain(brain);
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

  const toggleMining = async () => setIsMining(!isMining);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BrainCircuit color="#38bdf8" size={32} />
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>AI Miner Pro 2.0</h2>
        </div>
        <nav>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={20} /> Dashboard</div>
          <div className={`nav-item ${activeTab === 'aibrain' ? 'active' : ''}`} onClick={() => setActiveTab('aibrain')}><BrainCircuit size={20} /> AI Brain</div>
          <div className={`nav-item ${activeTab === 'devices' ? 'active' : ''}`} onClick={() => setActiveTab('devices')}><HardDrive size={20} /> Devices</div>
          <div className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}><BarChart3 size={20} /> Analytics</div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><Settings size={20} /> Settings</div>
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <button className={`btn ${isMining ? 'btn-stop' : 'btn-start'}`} onClick={toggleMining} style={{ width: '100%' }}>
            {isMining ? 'Stop Neural Engine' : 'Start Neural Engine'}
          </button>
        </div>
      </aside>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="grid-stats">
              <div className="card"><Activity color="#38bdf8" /><div className="stat-value">{minerStatus.hashrate}</div><div className="stat-label">Neural Hashrate</div></div>
              <div className="card"><Zap color="#facc15" /><div className="stat-value">$18.20</div><div className="stat-label">Daily Yield (AI Boosted)</div></div>
              <div className="card"><TrendingUp color="#4ade80" /><div className="stat-value">94.2%</div><div className="stat-label">AI Confidence</div></div>
              <div className="card"><Eye color="#a855f7" /><div className="stat-value">{minerStatus.coin}</div><div className="stat-label">Neural Target</div></div>
            </div>
            <div className="card" style={{ height: '350px' }}>
              <h3>Yield Projection (The Neural Edge)</h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={analytics}>
                  <defs>
                    <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/><stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                  <Area type="monotone" dataKey="aiYield" stroke="#38bdf8" fill="url(#colorAi)" name="Neural Yield" />
                  <Area type="monotone" dataKey="fixedYield" stroke="#94a3b8" fill="transparent" name="Legacy Yield" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'aibrain' && aiBrain && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card" style={{ height: '400px' }}>
              <h3>Decision Priority Weights</h3>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie data={[
                    { name: 'Market', value: aiBrain.weights.market },
                    { name: 'Sentiment', value: aiBrain.weights.sentiment },
                    { name: 'Efficiency', value: aiBrain.weights.efficiency }
                  ]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {COLORS.map((entry, index) => <Cell key={`cell-${index}`} fill={entry} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="card" style={{ height: '400px' }}>
              <h3>Market Sentiment Heatmap</h3>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={aiBrain.sentimentHeatmap}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="coin" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                  <Bar dataKey="score" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3>Neural Predictions</h3>
              {aiBrain.predictions.map((p, i) => (
                <div key={i} className="card" style={{ background: '#0f172a', margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{p.target}: <strong style={{ color: '#4ade80' }}>{p.status}</strong></span>
                  <span className="stat-label">Confidence: {p.confidence}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <h3><AlertTriangle size={18} color="#facc15" /> Maintenance Alerts</h3>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                AI predicts 98% health. No anomalies detected in thermal or fan patterns.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'devices' && (
          <div className="card">
            <h2>Hardware Management</h2>
            {minerStatus.devices.map(device => (
              <div key={device.id} className="card" style={{ background: '#0f172a', display: 'flex', justifyContent: 'space-between' }}>
                <div><strong>{device.name}</strong><div className="stat-label">{device.type} | {device.temp} | {device.power}</div></div>
                <div className="stat-value">{device.hashrate}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card">
            <h2>Global Neural Settings</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="stat-label">AI Aggression Level</label>
              <input type="range" style={{ width: '100%', accentColor: '#38bdf8' }} />
            </div>
            <div className="card" style={{ background: '#0f172a' }}>
              <h3>Predictive Tuning</h3>
              <p className="stat-label">Automatically apply efficiency tweaks suggested by AI (Undervolt/Clocks).</p>
              <button className="btn btn-start">Enable AI Tuning</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
