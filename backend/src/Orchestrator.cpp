#include "Orchestrator.hpp"
#include <iostream>
#include <thread>
#include <chrono>
#include <regex>

Orchestrator::Orchestrator() : m_running(true) {
    std::thread([this]() {
        while (m_running) {
            this->monitorHardware();
            std::this_thread::sleep_for(std::chrono::seconds(2));
        }
    }).detach();
}

Orchestrator::~Orchestrator() {
    m_running = false;
    std::lock_guard<std::mutex> lock(m_mutex);
    for (auto& [name, runner] : m_runners) {
        runner->stop();
    }
}

void Orchestrator::startMiner(const std::string& minerName, const std::string& coin) {
    std::lock_guard<std::mutex> lock(m_mutex);

    if (m_runners.find(minerName) == m_runners.end()) {
        m_runners[minerName] = std::make_unique<ProcessRunner>();
    }

    m_minerStatuses[minerName] = {minerName, "Starting", 0.0, 0, 0.0, {}};

    std::vector<std::string> args = {"-o", m_defaultPool, "-u", m_placeholderWallet, "-p", "AI_Miner"};
    if (minerName == "XMRig") {
        args.push_back("--coin");
        args.push_back(coin);
    }

    m_runners[minerName]->launch(minerName + ".exe", args, [this, minerName](const std::string& line) {
        this->parseLogLine(minerName, line);
    });
}

void Orchestrator::stopMiner(const std::string& minerName) {
    std::lock_guard<std::mutex> lock(m_mutex);
    if (m_runners.count(minerName)) {
        m_runners[minerName]->stop();
        m_minerStatuses[minerName].status = "Stopped";
        m_minerStatuses[minerName].hashrate = 0.0;
    }
}

void Orchestrator::parseLogLine(const std::string& minerName, const std::string& line) {
    std::lock_guard<std::mutex> lock(m_mutex);
    auto& status = m_minerStatuses[minerName];

    // Store last 10 log lines
    status.lastLogs.push_back(line);
    if (status.lastLogs.size() > 10) {
        status.lastLogs.erase(status.lastLogs.begin());
    }

    // Simple regex to extract hashrate: "Hashrate: 45.2 MH/s"
    std::regex hr_regex("Hashrate: ([0-9.]+)");
    std::smatch matches;
    if (std::regex_search(line, matches, hr_regex) && matches.size() > 1) {
        status.hashrate = std::stod(matches[1].str());
        status.status = "Running";
    }

    // Extract temperature: "Temp: 62C"
    std::regex temp_regex("Temp: ([0-9]+)");
    if (std::regex_search(line, matches, temp_regex) && matches.size() > 1) {
        status.temperature = std::stoi(matches[1].str());
    }
}

std::vector<MinerStatus> Orchestrator::getAllStatus() {
    std::lock_guard<std::mutex> lock(m_mutex);
    std::vector<MinerStatus> statuses;
    for (auto const& [name, status] : m_minerStatuses) {
        statuses.push_back(status);
    }
    return statuses;
}

void Orchestrator::updateMiningStrategy(const std::string& coin) {
    std::cout << "[AI STRATEGY] Switching to: " << coin << std::endl;
    // In a real app, this would trigger a stop-and-restart with new config
    startMiner("XMRig", coin);
}

void Orchestrator::monitorHardware() {
    // Only mock additional system load here, hashrate/temp comes from logs
    std::lock_guard<std::mutex> lock(m_mutex);
    for (auto& [name, status] : m_minerStatuses) {
        if (status.status == "Running") {
            status.load = 85.0 + (rand() % 15);
        }
    }
}
