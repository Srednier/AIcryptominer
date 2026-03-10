#include <iostream>
#include <thread>
#include <chrono>
#include "Orchestrator.hpp"
#include "Scraper.hpp"
#include "Agent.hpp"
#include "NeuralEngine.hpp"
#include "AIExtensions.hpp"
#include "Analytics.hpp"
#include "SmartGuard.hpp"
#include "ExperienceBuffer.hpp"

void trainingLoop(Orchestrator& orch, NeuralEngine& neural, SentimentAnalyzer& sentiment, EfficiencyTuner& tuner, Scraper& scraper, AnalyticsManager& analytics, ExperienceBuffer& buffer) {
    RewardCalculator rewardCalc;

    while (true) {
        // 1. Current State
        auto marketData = scraper.getMarketData();
        double hype = sentiment.analyzeHype("ETH");
        double eff = tuner.calculateEfficiency(50.0, 150.0);
        std::vector<double> state;
        for (auto const& [c, p] : marketData) state.push_back(p);

        // 2. Action (Inference with Exploration)
        std::string neuralTarget = neural.runInference(state, hype, eff);
        int action = (neuralTarget == "GEM_COIN_PUMP" ? 0 : 1);

        // 3. Act
        orch.updateMiningStrategy(neuralTarget);
        std::this_thread::sleep_for(std::chrono::seconds(2)); // Wait for result

        // 4. Observe Reward
        double grossProfit = 0.5 + (rand() % 100) / 100.0; // Simulated result
        double electricity = 0.4;
        double reward = rewardCalc.calculate(grossProfit, electricity, true);

        // 5. Store Experience
        buffer.add({state, action, reward});

        // 6. Train
        neural.train(buffer);

        analytics.recordEarning(grossProfit, true);

        std::this_thread::sleep_for(std::chrono::seconds(5));
    }
}

int main() {
    std::cout << "AI Crypto Miner Engine v2.1 - THE TRAINING UPDATE" << std::endl;

    Orchestrator orchestrator;
    NeuralEngine neural;
    SentimentAnalyzer sentiment;
    EfficiencyTuner tuner;
    Scraper scraper;
    AnalyticsManager analytics;
    ExperienceBuffer buffer(50000);

    std::thread trainThread(trainingLoop, std::ref(orchestrator), std::ref(neural), std::ref(sentiment), std::ref(tuner), std::ref(scraper), std::ref(analytics), std::ref(buffer));

    while(true) {
        auto statuses = orchestrator.getAllStatus();
        for (const auto& s : statuses) {
            if (s.status == "Running") {
                std::cout << "[NEURAL TRAINING] Batch: " << buffer.size() << " | ε: " << neural.getEpsilon() << std::endl;
            }
        }
        std::this_thread::sleep_for(std::chrono::seconds(10));
    }

    return 0;
}
