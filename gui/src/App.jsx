import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend, PieChart, Pie, Cell
} from 'recharts';
import {
  LayoutDashboard, Wallet, Settings, Activity, Thermometer, Cpu, Zap, BrainCircuit, Play, Square, BarChart3, HardDrive, GraduationCap, Cpu as CpuIcon, Laptop, Monitor
} from 'lucide-react';
import './App.css';

const COLORS = ['#38bdf8', '#a855f7', '#4ade80'];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMining, setIsMining] = useState(false);
  const [minerStatus, setMinerStatus] = useState({
    status: 'Ready', coin: 'None', hashrate: '0.0 MH/s', temp: '0°C', load: '0%', devices: [], logs: []
  });
  const [aiBrain, setAIBrain] = useState({
    weights: { market: 0.33, sentiment: 0.33, efficiency: 0.33 },
    epsilon: '0.300',
    multiModel: {
      gpu: { name: 'GPU Specialist', algo: 'DQN', status: 'Idle', curve: [] },
      cpu: { name: 'CPU Specialist', algo: 'PPO', status: 'Idle', curve: [] }
    }
  });
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    let interval;
    const fetchData = () => {
      const curveGPU = [];
      const curveCPU = [];
      for (let i = 0; i < 20; i++) {
        curveGPU.push({ step: i, reward: 0.5 + Math.log(i + 1) * 0.25 });
        curveCPU.push({ step: i, reward: 0.3 + Math.log(i + 1) * 0.15 });
      }

      setMinerStatus({
        status: 'Running', coin: 'ETH/XMR', hashrate: '52.1 MH/s', temp: '64°C', load: '92%', devices: [], logs: ["[MULTI] GPU Agent: Switching to ETH_HIGH_PROFIT", "[MULTI] CPU Agent: Staying on XMR_STABLE"]
      });
      setAIBrain({
        weights: { market: 0.35, sentiment: 0.45, efficiency: 0.20 },
        epsilon: '0.125',
        multiModel: {
          gpu: { name: 'GPU Specialist', algo: 'DQN', status: 'Yield Optimization', curve: curveGPU },
          cpu: { name: 'CPU Specialist', algo: 'PPO', status: 'Efficiency Tuning', curve: curveCPU }
        }
      });

      const history = [];
      for (let i = 0; i < 7; i++) {
        const base = 10 + Math.random() * 5;
        history.push({ date: `Jan ${14-i}`, aiYield: base + 6, fixedYield: base });
      }
      setAnalytics(history.reverse());
    };

    if (isMining) {
      fetchData();
      interval = setInterval(fetchData, 3000);
    }
    return () => clearInterval(interval);
  }, [isMining]);

  const weightData = [
    { name: 'Market', value: aiBrain.weights.market },
    { name: 'Sentiment', value: aiBrain.weights.sentiment },
    { name: 'Efficiency', value: aiBrain.weights.efficiency }
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BrainCircuit color="#38bdf8" size={32} />
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>AI Miner Pro 2.2</h2>
        </div>
        <nav>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={20} /> Dashboard</div>
          <div className={`nav-item ${activeTab === 'aibrain' ? 'active' : ''}`} onClick={() => setActiveTab('aibrain')}><Monitor size={20} /> Multi-Agent AI</div>
          <div className={`nav-item ${activeTab === 'devices' ? 'active' : ''}`} onClick={() => setActiveTab('devices')}><HardDrive size={20} /> Devices</div>
          <div className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}><BarChart3 size={20} /> Analytics</div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><Settings size={20} /> Settings</div>
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <button className={`btn ${isMining ? 'btn-stop' : 'btn-start'}`} onClick={() => setIsMining(!isMining)} style={{ width: '100%' }}>
            {isMining ? 'Stop Multi-Agent' : 'Start Multi-Agent'}
          </button>
        </div>
      </aside>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="grid-stats">
              <div className="card"><Activity color="#38bdf8" /><div className="stat-value">{minerStatus.hashrate}</div><div className="stat-label">Neural Hashrate</div></div>
              <div className="card"><Zap color="#facc15" /><div className="stat-value">$22.40</div><div className="stat-label">Multi-Agent Yield</div></div>
              <div className="card"><CpuIcon color="#4ade80" /><div className="stat-value">XMR (Eco)</div><div className="stat-label">CPU Strategy</div></div>
              <div className="card"><Monitor color="#a855f7" /><div className="stat-value">ETH (Peak)</div><div className="stat-label">GPU Strategy</div></div>
            </div>
            <div className="card" style={{ height: '350px' }}>
              <h3>Multi-Agent Performance Boost</h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={analytics}>
                  <defs>
                    <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/><stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                  <Area type="monotone" dataKey="aiYield" stroke="#38bdf8" fill="url(#colorAi)" name="Multi-Agent Yield" />
                  <Area type="monotone" dataKey="fixedYield" stroke="#94a3b8" fill="transparent" name="Legacy Yield" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {activeTab === 'aibrain' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card" style={{ height: '350px' }}>
              <h3>GPU Specialist (DQN) - Rewards</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={aiBrain.multiModel.gpu.curve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="step" hide />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="reward" stroke="#a855f7" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card" style={{ height: '350px' }}>
              <h3>CPU Specialist (PPO) - Rewards</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={aiBrain.multiModel.cpu.curve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="step" hide />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="reward" stroke="#38bdf8" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card" style={{ minHeight: '300px' }}>
              <h3>Shared Priority Matrix</h3>
              <div style={{ height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={weightData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {weightData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card">
              <h3>Agent Status</h3>
              <div className="card" style={{ background: '#0f172a', margin: '0.5rem 0' }}>
                <strong>{aiBrain.multiModel.gpu.name}</strong>: {aiBrain.multiModel.gpu.status} (ε: {aiBrain.epsilon})
              </div>
              <div className="card" style={{ background: '#0f172a', margin: '0.5rem 0' }}>
                <strong>{aiBrain.multiModel.cpu.name}</strong>: {aiBrain.multiModel.cpu.status} (ε: {aiBrain.epsilon})
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card">
            <h2>Algorithm Selection</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="card" style={{ background: '#0f172a' }}>
                <h3>GPU Algorithm</h3>
                <select className="input-field"><option>DQN (Recommended)</option><option>PPO</option></select>
              </div>
              <div className="card" style={{ background: '#0f172a' }}>
                <h3>CPU Algorithm</h3>
                <select className="input-field"><option>PPO (Recommended)</option><option>DQN</option></select>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
