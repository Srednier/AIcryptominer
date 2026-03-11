import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import {
  LayoutDashboard, Wallet, Settings, Activity, Thermometer, Cpu, Zap, BrainCircuit, Play, Square, BarChart3, HardDrive, GraduationCap, Cpu as CpuIcon, Laptop, Monitor, Globe, ShieldCheck, Smartphone, SlidersHorizontal
} from 'lucide-react';
import './App.css';

const COLORS = ['#38bdf8', '#a855f7', '#4ade80', '#facc15'];

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
  const [swarmStats, setSwarmStats] = useState({
    peers: 42, globalKnowledge: '8.4 GB', consensus: '99.8%', topAlgos: ['ETH', 'RVN', 'XMR']
  });
  const [tuning, setTuning] = useState({
    gpu: { core: 2200, mem: 2100, volt: 950, efficiency: 0.98 },
    cpu: { freq: 4.2, volt: 1.1, efficiency: 0.95 }
  });

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
        status: 'Running', coin: 'ETH/XMR', hashrate: '52.1 MH/s', temp: '64°C', load: '92%', devices: [], logs: ["[SWARM] Consensus reached: RVN yield high", "[TUNER] Sweet spot found at 920mv", "[REMOTE] Authorized poll from ID: Mobile_01"]
      });
      setAIBrain({
        weights: { market: 0.35, sentiment: 0.45, efficiency: 0.20 },
        epsilon: '0.125',
        multiModel: {
          gpu: { name: 'GPU Specialist', algo: 'DQN', status: 'Yield Optimization', curve: curveGPU },
          cpu: { name: 'CPU Specialist', algo: 'PPO', status: 'Efficiency Tuning', curve: curveCPU }
        }
      });
    };

    if (isMining) {
      fetchData();
      interval = setInterval(fetchData, 3000);
    }
    return () => clearInterval(interval);
  }, [isMining]);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BrainCircuit color="#38bdf8" size={32} />
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>AI Miner Pro 3.1</h2>
        </div>
        <nav>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><LayoutDashboard size={20} /> Dashboard</div>
          <div className={`nav-item ${activeTab === 'swarm' ? 'active' : ''}`} onClick={() => setActiveTab('swarm')}><Globe size={20} /> Swarm Intel</div>
          <div className={`nav-item ${activeTab === 'tuning' ? 'active' : ''}`} onClick={() => setActiveTab('tuning')}><SlidersHorizontal size={20} /> Precision Tuning</div>
          <div className={`nav-item ${activeTab === 'remote' ? 'active' : ''}`} onClick={() => setActiveTab('remote')}><Smartphone size={20} /> Remote Access</div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><Settings size={20} /> Settings</div>
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <button className={`btn ${isMining ? 'btn-stop' : 'btn-start'}`} onClick={() => setIsMining(!isMining)} style={{ width: '100%' }}>
            {isMining ? 'Stop Master Brain' : 'Start Master Brain'}
          </button>
        </div>
      </aside>

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <div className="grid-stats">
              <div className="card"><Activity color="#38bdf8" /><div className="stat-value">{minerStatus.hashrate}</div><div className="stat-label">Neural Hashrate</div></div>
              <div className="card"><Globe color="#a855f7" /><div className="stat-value">{swarmStats.peers}</div><div className="stat-label">Swarm Peers</div></div>
              <div className="card"><SlidersHorizontal color="#4ade80" /><div className="stat-value">{tuning.gpu.volt}mv</div><div className="stat-label">AI Voltage Sweet Spot</div></div>
              <div className="card"><ShieldCheck color="#facc15" /><div className="stat-value">{swarmStats.consensus}</div><div className="stat-label">Consensus Level</div></div>
            </div>
            <div className="card">
              <h3>Multi-Agent Decision Core</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                 <div className="card" style={{ background: '#0f172a' }}>
                    <h4 style={{ margin: '0 0 1rem 0' }}>GPU Specialist (DQN)</h4>
                    <ResponsiveContainer width="100%" height={150}>
                       <LineChart data={aiBrain.multiModel.gpu.curve}><Line type="monotone" dataKey="reward" stroke="#a855f7" dot={false} /></LineChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="card" style={{ background: '#0f172a' }}>
                    <h4 style={{ margin: '0 0 1rem 0' }}>CPU Specialist (PPO)</h4>
                    <ResponsiveContainer width="100%" height={150}>
                       <LineChart data={aiBrain.multiModel.cpu.curve}><Line type="monotone" dataKey="reward" stroke="#38bdf8" dot={false} /></LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'swarm' && (
          <div className="grid-stats" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
            <div className="card">
               <h3>Global Knowledge Network</h3>
               <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', borderRadius: '0.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                     <Globe size={64} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                     <div className="stat-value">42 active nodes</div>
                     <div className="stat-label">Syncing cross-hardware optimization data...</div>
                  </div>
               </div>
            </div>
            <div className="card">
               <h3>Trusted Consensuses</h3>
               <div className="card" style={{ background: '#0f172a' }}><strong>RTX 3080</strong>: Ethash 92MH/s @ 230W <ShieldCheck size={16} color="#4ade80" inline /></div>
               <div className="card" style={{ background: '#0f172a' }}><strong>RX 6800</strong>: TeamRed 62MH/s @ 125W <ShieldCheck size={16} color="#4ade80" inline /></div>
               <div className="card" style={{ background: '#0f172a' }}><strong>Xeon 8280</strong>: XMR 14kH/s @ 140W <ShieldCheck size={16} color="#4ade80" inline /></div>
            </div>
          </div>
        )}

        {activeTab === 'tuning' && (
           <div className="card">
              <h3>Precision AI Tuning (AMD PowerPlay Hooks)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                 <div>
                    <h4>GPU Core Voltage Sweeper</h4>
                    <div style={{ height: '300px', background: '#0f172a', borderRadius: '0.5rem', padding: '1rem' }}>
                       <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart>
                             <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                             <XAxis type="number" dataKey="volt" name="Voltage" unit="mv" stroke="#94a3b8" />
                             <YAxis type="number" dataKey="eff" name="Efficiency" unit="H/W" stroke="#94a3b8" />
                             <Scatter name="AI Sweep" data={[{volt: 800, eff: 0.7}, {volt: 850, eff: 0.85}, {volt: 900, eff: 0.98}, {volt: 950, eff: 0.92}, {volt: 1000, eff: 0.8}]} fill="#38bdf8" />
                          </ScatterChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
                 <div className="card" style={{ background: '#0f172a' }}>
                    <div style={{ marginBottom: '1rem' }}><strong>Status</strong>: <span style={{ color: '#4ade80' }}>LOCKED ON SWEET SPOT</span></div>
                    <div className="input-field">Core: {tuning.gpu.core}MHz</div>
                    <div className="input-field">Voltage: {tuning.gpu.volt}mv</div>
                    <div className="input-field">Efficiency Score: {(tuning.gpu.efficiency * 100).toFixed(1)}%</div>
                    <button className="btn btn-start" style={{ marginTop: '1rem', width: '100%' }}>Re-Sweep for Sweet Spot</button>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'remote' && (
           <div className="card">
              <h3>Mobile Monitoring & Remote Control</h3>
              <div className="card" style={{ background: '#0f172a', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                 <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ width: '150px', height: '150px', background: 'black' }}></div>
                 </div>
                 <div>
                    <h4>Secure API Access</h4>
                    <div className="input-field">Endpoint: https://api.aiminer.io/v1/remote</div>
                    <div className="input-field">API Key: MASTER-KEY-V3-XXXX-XXXX</div>
                    <div style={{ marginTop: '1rem' }}>
                       <button className="btn btn-start">Generate New Key</button>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
}

export default App;
