#include "NeuralEngine.hpp"
#include <iostream>
#include <cmath>

NeuralEngine::NeuralEngine() {
    m_weights = {0.6, 0.2, 0.2}; // Initial weights
}

std::string NeuralEngine::runInference(const std::vector<double>& marketData,
                                     double sentimentScore,
                                     double currentEfficiency) {
    // Simulated Neural Network inference
    // In real LibTorch:
    // auto input = torch::cat({marketTensor, sentimentTensor, effTensor});
    // auto output = m_model->forward(input);

    std::cout << "[NEURAL] Running inference: Sentiment=" << sentimentScore << " Eff=" << currentEfficiency << std::endl;

    // Dynamic weight adjustment simulation
    if (sentimentScore > 0.8) {
        m_weights.sentimentWeight = 0.5;
        m_weights.marketWeight = 0.3;
        return "GEM_COIN_PUMP";
    }

    if (currentEfficiency < 0.5) {
        m_weights.efficiencyWeight = 0.6;
        return "ECO_STABLE_COIN";
    }

    return "ETH_STANDARD";
}

void NeuralEngine::train(double reward) {
    std::cout << "[NEURAL] Training model with reward: " << reward << std::endl;
    // SGD Step
}

AIWeights NeuralEngine::getCurrentPriorities() const {
    return m_weights;
}
