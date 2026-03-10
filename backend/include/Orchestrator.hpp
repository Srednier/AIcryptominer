#ifndef ORCHESTRATOR_HPP
#define ORCHESTRATOR_HPP

#include <string>
#include <vector>
#include <map>
#include <memory>
#include <mutex>
#include "ProcessRunner.hpp"

struct MinerStatus {
    std::string name;
    std::string status;
    double hashrate;
    int temperature;
    double load;
    std::vector<std::string> lastLogs;
};

class Orchestrator {
public:
    Orchestrator();
    ~Orchestrator();

    void startMiner(const std::string& minerName, const std::string& coin);
    void stopMiner(const std::string& minerName);
    std::vector<MinerStatus> getAllStatus();

    void updateMiningStrategy(const std::string& coin);

private:
    void monitorHardware();
    void parseLogLine(const std::string& minerName, const std::string& line);

    std::map<std::string, MinerStatus> m_minerStatuses;
    std::map<std::string, std::unique_ptr<ProcessRunner>> m_runners;
    std::mutex m_mutex;
    bool m_running;

    // Configs
    const std::string m_placeholderWallet = "44AFFq5kSiGBo3SBYM76BXDHF... (Demo Only)";
    const std::string m_defaultPool = "moneroocean.stream:10128";
};

#endif
