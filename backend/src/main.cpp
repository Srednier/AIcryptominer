#include <iostream>
#include <thread>
#include <chrono>
#include "Orchestrator.hpp"
#include "Scraper.hpp"
#include "Agent.hpp"
#include "Downloader.hpp"
#include "Analytics.hpp"
#include "SmartGuard.hpp"

void aiLoop(Orchestrator& orchestrator, MiningAgent& agent, Scraper& scraper, AnalyticsManager& analytics, SmartGuard& guard) {
    while (true) {
        auto marketData = scraper.getMarketData();
        std::vector<double> state;
        for (auto const& [coin, price] : marketData) {
            state.push_back(price);
        }

        std::string bestCoin = agent.decideNextCoin(state);

        // Check Safeguard
        if (guard.shouldMine(1.5, 0.8)) { // Mock profit vs cost
            orchestrator.updateMiningStrategy(bestCoin);
            analytics.recordEarning(0.001, true);
        } else {
            orchestrator.stopMiner("TeamRedMiner");
        }

        std::this_thread::sleep_for(std::chrono::seconds(15));
    }
}

int main() {
    std::cout << "AI Crypto Miner Engine v1.2" << std::endl;

    Orchestrator orchestrator;
    MiningAgent agent;
    Scraper scraper;
    AnalyticsManager analytics;
    SmartGuard guard;

    std::thread aiThread(aiLoop, std::ref(orchestrator), std::ref(agent), std::ref(scraper), std::ref(analytics), std::ref(guard));

    while(true) {
        auto statuses = orchestrator.getAllStatus();
        for (const auto& s : statuses) {
            if (s.status == "Running") {
                std::cout << "[IPC] " << s.name << " | " << s.totalHashrate << " MH/s" << std::endl;
                for (const auto& d : s.devices) {
                    std::cout << "   - " << d.name << " [" << d.type << "]: " << d.hashrate << " MH/s | " << d.temperature << "C" << std::endl;
                }
            }
        }
        std::this_thread::sleep_for(std::chrono::seconds(10));
    }

    return 0;
}
