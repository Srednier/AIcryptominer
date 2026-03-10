# AI Crypto Miner with GUI (v1.1 - Active Mining)

A modern, AI-optimized cryptocurrency miner featuring a React-based GUI and a high-performance C++ backend capable of orchestrating real mining processes.

## New in v1.1
- **Live Process Management**: Launches and monitors XMRig (CPU) and TeamRedMiner (AMD GPU).
- **Automatic Binary Downloader**: Fetches the latest miner releases from GitHub.
- **Real-time Log Parsing**: Extracts hashrate and temperature metrics directly from miner output using regex.
- **Interactive GUI**: Added Start/Stop controls and a live log terminal view.
- **Security Guide**: Integrated instructions for Antivirus/Windows Defender exclusions.

## Project Structure
- `gui/`: Electron + React (Vite) frontend with IPC bridge.
- `backend/`: C++ (CMake) engine including ProcessRunner, Downloader, and AI Agent.

## Prerequisites for Windows Build
1. **Node.js**: For building the GUI.
2. **Visual Studio 2022**: With "Desktop development with C++" workload.
3. **CMake**: Version 3.10 or higher.
4. **LibTorch**: Download the C++ distribution of PyTorch and set `Torch_DIR`.
5. **AMD ADL SDK**: Place headers in `backend/include` for hardware telemetry.

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
Start the Electron application:
```bash
cd gui
npm start
```
The GUI will automatically initialize the C++ engine and start the AI optimization loop.

## Disclaimer
This software is for educational and simulation purposes in this environment. Ensure you have the right to use the hardware and follow local regulations regarding cryptocurrency mining.
