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

void globalNeuralLoop(Orchestrator& orch, NeuralEngine& neural, SentimentAnalyzer& sentiment, EfficiencyTuner& tuner, PredictiveMaintenance& maintenance, Scraper& scraper, AnalyticsManager& analytics) {
    while (true) {
        // 1. Gather all inputs
        auto marketData = scraper.getMarketData();
        double hype = sentiment.analyzeHype("ETH");
        double eff = tuner.calculateEfficiency(50.0, 150.0);

        // 2. Predictive Checks
        maintenance.predictFailure(65, 1200);

        // 3. Global AI Decision
        std::vector<double> state;
        for (auto const& [c, p] : marketData) state.push_back(p);

        std::string neuralTarget = neural.runInference(state, hype, eff);

        // 4. Act
        orch.updateMiningStrategy(neuralTarget);
        tuner.suggestTweaks(eff);
        analytics.recordEarning(0.005, true);

        std::this_thread::sleep_for(std::chrono::seconds(15));
    }
}

int main() {
    std::cout << "AI Crypto Miner Engine v2.0 - THE NEURAL UPDATE" << std::endl;

    Orchestrator orchestrator;
    NeuralEngine neural;
    SentimentAnalyzer sentiment;
    EfficiencyTuner tuner;
    PredictiveMaintenance maintenance;
    Scraper scraper;
    AnalyticsManager analytics;

    std::thread neuralThread(globalNeuralLoop, std::ref(orchestrator), std::ref(neural), std::ref(sentiment), std::ref(tuner), std::ref(maintenance), std::ref(scraper), std::ref(analytics));

    while(true) {
        auto statuses = orchestrator.getAllStatus();
        for (const auto& s : statuses) {
            if (s.status == "Running") {
                std::cout << "[NEURAL IPC] Active: " << s.totalHashrate << " MH/s" << std::endl;
            }
        }
        std::this_thread::sleep_for(std::chrono::seconds(10));
    }

    return 0;
}
