#include <iostream>
#include <thread>
#include <chrono>
#include "Orchestrator.hpp"
#include "Scraper.hpp"
#include "Agent.hpp"
#include "Downloader.hpp"

void aiLoop(Orchestrator& orchestrator, MiningAgent& agent, Scraper& scraper) {
    while (true) {
        auto marketData = scraper.getMarketData();
        std::vector<double> state;
        for (auto const& [coin, price] : marketData) {
            state.push_back(price);
        }

        std::string bestCoin = agent.decideNextCoin(state);
        orchestrator.updateMiningStrategy(bestCoin);

        std::this_thread::sleep_for(std::chrono::seconds(15));
    }
}

int main() {
    std::cout << "AI Crypto Miner Engine v1.0" << std::endl;

    MinerDownloader downloader;
    Orchestrator orchestrator;
    MiningAgent agent;
    Scraper scraper;

    // Step 1: Ensure miners are present
    std::cout << "[INIT] Checking mining binaries..." << std::endl;
    // downloader.downloadXMRig(nullptr);
    // downloader.downloadTeamRedMiner(nullptr);

    // Step 2: Start AI and Simulation
    std::thread aiThread(aiLoop, std::ref(orchestrator), std::ref(agent), std::ref(scraper));

    // Step 3: IPC loop (Simulated for this sandbox)
    while(true) {
        auto statuses = orchestrator.getAllStatus();
        for (const auto& s : statuses) {
            if (s.status == "Running") {
                std::cout << "[IPC] " << s.name << " | " << s.hashrate << " MH/s | " << s.temperature << "C" << std::endl;
                if (!s.lastLogs.empty()) {
                    std::cout << "  > LOG: " << s.lastLogs.back() << std::endl;
                }
            }
        }
        std::this_thread::sleep_for(std::chrono::seconds(5));
    }

    return 0;
}
