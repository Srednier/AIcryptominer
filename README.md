# AI Crypto Miner Pro (v1.2 - Smart Analytics & Safeguards)

A top-tier, AI-optimized cryptocurrency miner with granular hardware control and smart safeguards.

## Key Features in v1.2
- **Yield Analytics**: Compare AI-driven earnings against fixed-coin baselines in a dedicated Analytics view.
- **Per-Device Control**: Enable or disable specific GPUs/CPUs directly from the GUI.
- **Profitability Safeguard**: Automatically pauses mining if electricity costs exceed current yield.
- **Webhook Notifications**: Integrated Discord/Telegram webhook support for coin switch and overheat alerts.
- **Thermal Protection**: Smart monitoring to prevent hardware damage from overheating.

## Project Structure
- `gui/`: Advanced React dashboard with per-device toggles and multi-tab analytics.
- `backend/`: C++ core with AnalyticsManager, SmartGuard, and per-device Orchestrator.

## Building and Running

### 1. Build the GUI
```bash
cd gui
npm install
npm run build
```

### 2. Build the Backend
```bash
cd backend
mkdir build && cd build
cmake .. -DCMAKE_PREFIX_PATH="C:/path/to/libtorch"
cmake --build . --config Release
```

### 3. Execution
```bash
cd gui
npm start
```

## Development Status
V1.2 finalized the architecture for production-grade mining management with smart automation and safety. Simulation mode provides high-fidelity telemetry for cross-platform testing.
