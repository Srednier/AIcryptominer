import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import {
  LayoutDashboard, Wallet, Settings, Activity, Thermometer, Cpu, Zap, BrainCircuit, Play, Square, ShieldAlert, Terminal, BarChart3, HardDrive, Bell, Eye, TrendingUp, AlertTriangle, GraduationCap
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
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>AI Miner Pro 2.1</h2>
        </div>
        <nav>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={20} /> Dashboard</div>
          <div className={`nav-item ${activeTab === 'aibrain' ? 'active' : ''}`} onClick={() => setActiveTab('aibrain')}><BrainCircuit size={20} /> Neural Training</div>
          <div className={`nav-item ${activeTab === 'devices' ? 'active' : ''}`} onClick={() => setActiveTab('devices')}><HardDrive size={20} /> Devices</div>
          <div className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}><BarChart3 size={20} /> Analytics</div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><Settings size={20} /> Settings</div>
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <button className={`btn ${isMining ? 'btn-stop' : 'btn-start'}`} onClick={toggleMining} style={{ width: '100%' }}>
            {isMining ? 'Stop Training' : 'Start Training Loop'}
          </button>
        </div>
      </aside>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="grid-stats">
              <div className="card"><Activity color="#38bdf8" /><div className="stat-value">{minerStatus.hashrate}</div><div className="stat-label">Neural Hashrate</div></div>
              <div className="card"><Zap color="#facc15" /><div className="stat-value">$18.20</div><div className="stat-label">Daily Yield (AI Boosted)</div></div>
              <div className="card"><GraduationCap color="#4ade80" /><div className="stat-value">Batch #42</div><div className="stat-label">Learning Epoch</div></div>
              <div className="card"><TrendingUp color="#a855f7" /><div className="stat-value">{aiBrain ? aiBrain.epsilon : '0.300'}</div><div className="stat-label">Exploration Rate (ε)</div></div>
            </div>
            <div className="card" style={{ height: '350px' }}>
              <h3>Yield Projection (The Training Edge)</h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={analytics}>
                  <defs>
                    <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/><stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                  <Area type="monotone" dataKey="aiYield" stroke="#38bdf8" fill="url(#colorAi)" name="Trained Yield" />
                  <Area type="monotone" dataKey="fixedYield" stroke="#94a3b8" fill="transparent" name="Fixed Coin Yield" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'aibrain' && aiBrain && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card" style={{ height: '400px' }}>
              <h3>Cumulative Reward (Learning Progress)</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={aiBrain.learningCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="step" stroke="#94a3b8" label={{ value: 'Training Step', position: 'insideBottom', offset: -5, fill: '#94a3b8' }} />
                  <YAxis stroke="#94a3b8" label={{ value: 'Net Reward', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                  <Line type="monotone" dataKey="reward" stroke="#4ade80" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card" style={{ height: '400px' }}>
              <h3>Neural Decision Weights</h3>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie data={[
                    { name: 'Market (Learned)', value: aiBrain.weights.market },
                    { name: 'Sentiment (Learned)', value: aiBrain.weights.sentiment },
                    { name: 'Efficiency (Learned)', value: aiBrain.weights.efficiency }
                  ]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {COLORS.map((entry, index) => <Cell key={`cell-${index}`} fill={entry} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3>Training Status</h3>
              <div className="card" style={{ background: '#0f172a', margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Activity color="#4ade80" />
                <strong>{aiBrain.trainingStatus}</strong>
              </div>
              {aiBrain.predictions.map((p, i) => (
                <div key={i} className="card" style={{ background: '#0f172a', margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{p.target}: <strong style={{ color: '#38bdf8' }}>{p.status}</strong></span>
                  <span className="stat-label">Conf: {p.confidence}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <h3>Training Logs</h3>
              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#94a3b8', height: '150px', overflowY: 'auto' }}>
                <div>[2026-01-14 14:00:01] Buffer size: 1024 / 50000</div>
                <div>[2026-01-14 14:00:05] Sampling batch: size=32</div>
                <div>[2026-01-14 14:00:10] Backprop complete. Loss=0.042</div>
                <div>[2026-01-14 14:00:15] Epsilon decayed to {aiBrain.epsilon}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card">
            <h2>Neural Hyperparameters</h2>
            <div className="card" style={{ background: '#0f172a' }}>
              <label className="stat-label">Learning Rate (α): 0.01</label>
              <input type="range" style={{ width: '100%', accentColor: '#38bdf8' }} min="0.001" max="0.1" step="0.001" defaultValue="0.01" />
              <label className="stat-label">Epsilon Decay Rate: 0.005</label>
              <input type="range" style={{ width: '100%', accentColor: '#a855f7' }} min="0.001" max="0.05" step="0.001" defaultValue="0.005" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
