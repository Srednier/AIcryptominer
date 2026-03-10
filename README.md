# AI Crypto Miner with GUI

A modern, AI-optimized cryptocurrency miner featuring a React-based GUI and a high-performance C++ backend.

## Features
- **AI Orchestrator**: Uses Reinforcement Learning (LibTorch) to automatically switch to the most profitable coin.
- **Modern GUI**: Built with Electron, React, and Recharts for real-time monitoring and profitability tracking.
- **Hardware Optimized**: Designed for Windows with AMD GPU (ADL SDK) and CPU support.
- **Custom Scraper**: Built-in logic to gather market data directly from block explorers.

## Project Structure
- `gui/`: Electron + React (Vite) frontend.
- `backend/`: C++ (CMake) orchestrator and AI engine.

## Prerequisites for Windows Build
1. **Node.js**: For building the GUI.
2. **Visual Studio 2022**: With "Desktop development with C++" workload.
3. **CMake**: Version 3.10 or higher.
4. **LibTorch**: Download the C++ distribution of PyTorch and set `Torch_DIR`.
5. **AMD ADL SDK**: (Optional for build, required for GPU monitoring) Place headers in `backend/include`.

## Building the Project

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

### 3. Run
Launch the Electron app:
```bash
cd gui
npm run start
```
The GUI will communicate with the `miner_backend.exe` via IPC.

## Development Status
The current codebase includes a functional simulation environment. On non-Windows platforms, hardware monitoring and mining process execution use mock data and simulated processes.
