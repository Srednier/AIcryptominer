# AI Crypto Miner Pro v2.1 - THE TRAINING UPDATE

A fully autonomous, self-learning cryptocurrency mining platform featuring a deep reinforcement learning loop.

## Training v2.1 Features
- **Reinforcement Learning Loop**: Automatically trains the neural model using an ExperienceBuffer and RewardCalculator.
- **Epsilon-Greedy Exploration**: Balances learning new strategies with exploiting known profitable ones.
- **Reward Logic**: Factors in net profit (gross earnings minus electricity) and hardware health into the training signal.
- **Training Dashboard**: Real-time learning curve visualization and batch optimization status in the GUI.
- **Epsilon Decay Tracking**: Monitor the transition from exploration to expert exploitation.

## Project Structure
- `gui/`: Neural Training dashboard with interactive learning charts and hyperparameter controls.
- `backend/`: C++ engine with ExperienceBuffer, RewardCalculator, and training-enabled NeuralEngine.

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
Version 2.1 introduces full self-training capabilities. For optimal performance, Ensure the electricity cost is accurately configured in Settings to provide a correct reward signal to the AI.
