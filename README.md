# AI Crypto Miner Pro v2.0 - THE NEURAL UPDATE

A state-of-the-art cryptocurrency mining platform featuring a deep neural engine and predictive hardware management.

## Neural v2.0 Features
- **Deep Neural Engine**: LibTorch-based Reinforcement Learning for adaptive decision making.
- **Sentiment-Aware Mining**: Integrated SentimentAnalyzer scrapes news/hype to predict price spikes.
- **AI-Driven Efficiency**: EfficiencyTuner optimizes Hash-per-Watt in real-time.
- **Predictive Maintenance**: Early anomaly detection for GPU fans and thermal paste degradation.
- **AI Brain Visualization**: Real-time insight into neural priority weights and sentiment heatmaps.

## Project Structure
- `gui/`: Neural dashboard with specialized AI Brain and Analytics views.
- `backend/`: C++ core with NeuralEngine, SentimentAnalyzer, and EfficiencyTuner.

## Build and Run

### 1. Build the GUI
```bash
cd gui && npm install && npm run build
```

### 2. Build the Backend
```bash
cd backend && mkdir build && cd build
cmake .. -DCMAKE_PREFIX_PATH="C:/path/to/libtorch"
cmake --build . --config Release
```

### 3. Execution
```bash
cd gui && npm start
```

## Final Disclaimer
Version 2.0 represents a significant leap in AI-assisted compute management. Simulation mode is provided for cross-platform validation. For production Windows use, ensure LibTorch and AMD ADL SDK are correctly linked.
