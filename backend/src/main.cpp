#include <iostream>
#include <thread>
#include <chrono>
#include "Orchestrator.hpp"
#include "Scraper.hpp"
#include "Agent.hpp"

void aiLoop(Orchestrator& orchestrator, MiningAgent& agent, Scraper& scraper) {
    while (true) {
        // 1. Gather data
        auto marketData = scraper.getMarketData();
        std::vector<double> state;
        for (auto const& [coin, price] : marketData) {
            state.push_back(price);
        }

        // 2. AI Decision
        std::string bestCoin = agent.decideNextCoin(state);

        // 3. Update Orchestrator
        orchestrator.updateMiningStrategy(bestCoin);

        std::this_thread::sleep_for(std::chrono::seconds(10));
    }
}

void ipcLoop(Orchestrator& orchestrator) {
    while (true) {
        auto statuses = orchestrator.getAllStatus();
        for (const auto& s : statuses) {
            // This would normally be sent over a socket/pipe to Electron
            std::cout << "[IPC DATA] " << s.name << " | " << s.hashrate << " MH/s | " << s.temperature << " C" << std::endl;
        }
        std::this_thread::sleep_for(std::chrono::seconds(5));
    }
}

int main() {
    std::cout << "AI Crypto Miner Backend Starting..." << std::endl;

    Orchestrator orchestrator;
    MiningAgent agent;
    Scraper scraper;

    // Initial start
    orchestrator.startMiner("TeamRedMiner_AMD", "eth_config_v1");

    std::thread aiThread(aiLoop, std::ref(orchestrator), std::ref(agent), std::ref(scraper));
    std::thread ipcThread(ipcLoop, std::ref(orchestrator));

    aiThread.join();
    ipcThread.join();

    return 0;
}
