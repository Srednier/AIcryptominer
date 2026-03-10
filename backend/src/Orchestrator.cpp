#include "Orchestrator.hpp"
#include <iostream>
#include <thread>
#include <chrono>
#include <regex>

Orchestrator::Orchestrator() : m_running(true) {
    // Initialize with mock devices
    MinerStatus xmrig = {"XMRig", "Ready", 0.0, {}, {}};
    xmrig.devices.push_back({"cpu_0", "Intel Xeon Processor", "CPU", true, 0.0, 45, 80});
    m_minerStatuses["XMRig"] = xmrig;

    MinerStatus trm = {"TeamRedMiner", "Ready", 0.0, {}, {}};
    trm.devices.push_back({"gpu_0", "AMD Radeon RX 6800", "GPU", true, 0.0, 55, 150});
    trm.devices.push_back({"gpu_1", "AMD Radeon RX 6700 XT", "GPU", true, 0.0, 58, 120});
    m_minerStatuses["TeamRedMiner"] = trm;

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

    m_minerStatuses[minerName].status = "Starting";

    std::vector<std::string> args = {"-o", m_defaultPool, "-u", m_placeholderWallet};
    // In real app, we would add device indices based on enabled status
    m_runners[minerName]->launch(minerName + ".exe", args, [this, minerName](const std::string& line) {
        this->parseLogLine(minerName, line);
    });
}

void Orchestrator::stopMiner(const std::string& minerName) {
    std::lock_guard<std::mutex> lock(m_mutex);
    if (m_runners.count(minerName)) {
        m_runners[minerName]->stop();
        m_minerStatuses[minerName].status = "Stopped";
        m_minerStatuses[minerName].totalHashrate = 0.0;
        for(auto& d : m_minerStatuses[minerName].devices) d.hashrate = 0.0;
    }
}

void Orchestrator::setDeviceEnabled(const std::string& deviceId, bool enabled) {
    std::lock_guard<std::mutex> lock(m_mutex);
    for (auto& [name, status] : m_minerStatuses) {
        for (auto& device : status.devices) {
            if (device.id == deviceId) {
                device.enabled = enabled;
                std::cout << "[ORCH] Device " << device.name << " set to " << (enabled ? "ON" : "OFF") << std::endl;
                // Restart miner logic would go here
            }
        }
    }
}

void Orchestrator::parseLogLine(const std::string& minerName, const std::string& line) {
    std::lock_guard<std::mutex> lock(m_mutex);
    auto& status = m_minerStatuses[minerName];
    status.lastLogs.push_back(line);
    if (status.lastLogs.size() > 10) status.lastLogs.erase(status.lastLogs.begin());

    std::regex hr_regex("Hashrate: ([0-9.]+)");
    std::smatch matches;
    if (std::regex_search(line, matches, hr_regex)) {
        double hr = std::stod(matches[1].str());
        status.totalHashrate = hr;
        status.status = "Running";
        // Distribute to enabled devices for mock
        int enabledCount = 0;
        for (auto& d : status.devices) if (d.enabled) enabledCount++;
        if (enabledCount > 0) {
            for (auto& d : status.devices) {
                if (d.enabled) d.hashrate = hr / enabledCount;
                else d.hashrate = 0.0;
            }
        }
    }
}

std::vector<MinerStatus> Orchestrator::getAllStatus() {
    std::lock_guard<std::mutex> lock(m_mutex);
    std::vector<MinerStatus> statuses;
    for (auto const& [name, status] : m_minerStatuses) statuses.push_back(status);
    return statuses;
}

void Orchestrator::updateMiningStrategy(const std::string& coin) {
    startMiner("TeamRedMiner", coin);
}

void Orchestrator::monitorHardware() {
    std::lock_guard<std::mutex> lock(m_mutex);
    for (auto& [name, status] : m_minerStatuses) {
        for (auto& d : status.devices) {
            if (d.enabled && status.status == "Running") {
                d.temperature = 55 + (rand() % 15);
                d.powerUsage = 100 + (rand() % 100);
            } else {
                d.temperature = 35 + (rand() % 5);
                d.powerUsage = 10;
            }
        }
    }
}
