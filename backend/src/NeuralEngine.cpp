#include "NeuralEngine.hpp"
#include <iostream>
#include <cmath>
#include <random>

NeuralEngine::NeuralEngine() : m_epsilon(0.3), m_learningRate(0.01) {
    m_weights = {0.6, 0.2, 0.2};
}

std::string NeuralEngine::runInference(const std::vector<double>& marketData,
                                     double sentimentScore,
                                     double currentEfficiency) {

    // Epsilon-Greedy Exploration
    std::random_device rd;
    std::mt19937 g(rd());
    std::uniform_real_distribution<double> dist(0, 1);

    if (dist(g) < m_epsilon) {
        std::cout << "[NEURAL] EXPLORATION MODE: Trying random strategy." << std::endl;
        int action = rand() % 3;
        if (action == 0) return "GEM_COIN_PUMP";
        if (action == 1) return "ECO_STABLE_COIN";
        return "ETH_STANDARD";
    }

    std::cout << "[NEURAL] EXPLOITATION MODE: Using neural model." << std::endl;

    if (sentimentScore > 0.8) return "GEM_COIN_PUMP";
    if (currentEfficiency < 0.5) return "ECO_STABLE_COIN";
    return "ETH_STANDARD";
}

void NeuralEngine::train(ExperienceBuffer& buffer) {
    if (buffer.size() < 10) return;

    auto batch = buffer.sample(10);
    std::cout << "[NEURAL] TRAINING: Optimizing weights based on " << batch.size() << " experiences." << std::endl;

    for (const auto& exp : batch) {
        // Gradient Descent simulation: adjust weights towards actions with high rewards
        if (exp.reward > 0) {
            m_weights.marketWeight += m_learningRate * 0.1;
            m_weights.sentimentWeight += m_learningRate * 0.1;
        } else {
            m_weights.marketWeight -= m_learningRate * 0.1;
        }
    }

    // Decay epsilon as we learn
    if (m_epsilon > 0.05) m_epsilon -= 0.005;
}

AIWeights NeuralEngine::getCurrentPriorities() const {
    return m_weights;
}
