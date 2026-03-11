#include <iostream>
#include <thread>
#include <chrono>
#include "Orchestrator.hpp"
#include "Scraper.hpp"
#include "NeuralEngine.hpp"
#include "AdvancedAI.hpp"
#include "AIExtensions.hpp"
#include "ExperienceBuffer.hpp"

void multiAgentLoop(Orchestrator& orch, MultiModelManager& manager, Scraper& scraper, SentimentAnalyzer& sentiment, EfficiencyTuner& tuner, ExperienceBuffer& buffer) {
    while (true) {
        auto marketData = scraper.getMarketData();
        std::vector<double> state;
        for (auto const& [c, p] : marketData) state.push_back(p);

        manager.updateAndTrain(state, 0.1, buffer);

        std::cout << "[MULTI-AGENT] CPU Specialist -> " << manager.getCPUTarget() << std::endl;
        std::cout << "[MULTI-AGENT] GPU Specialist -> " << manager.getGPUTarget() << std::endl;

        orch.updateMiningStrategy(manager.getGPUTarget());

        std::this_thread::sleep_for(std::chrono::seconds(10));
    }
}

int main() {
    std::cout << "AI Crypto Miner Engine v2.2 - THE MULTI-AGENT UPDATE" << std::endl;

    Orchestrator orch;
    MultiModelManager manager;
    Scraper scraper;
    SentimentAnalyzer sentiment;
    EfficiencyTuner tuner;
    ExperienceBuffer buffer(1000);

    std::thread multiThread(multiAgentLoop, std::ref(orch), std::ref(manager), std::ref(scraper), std::ref(sentiment), std::ref(tuner), std::ref(buffer));

    while(true) {
        auto statuses = orch.getAllStatus();
        for (const auto& s : statuses) {
            if (s.status == "Running") {
                std::cout << "[IPC] " << s.name << " active with " << s.totalHashrate << " MH/s" << std::endl;
            }
        }
        std::this_thread::sleep_for(std::chrono::seconds(10));
    }

    return 0;
}
