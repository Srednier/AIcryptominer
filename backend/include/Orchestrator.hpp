#ifndef ORCHESTRATOR_HPP
#define ORCHESTRATOR_HPP

#include <string>
#include <vector>
#include <map>
#include <memory>
#include <mutex>
#include "ProcessRunner.hpp"
#include "MultiModelManager.hpp"
#include "Analytics.hpp"
#include "Scraper.hpp"

struct DeviceStatus {
    std::string id;
    std::string name;
    std::string type; // GPU or CPU
    bool enabled;
    double hashrate;
    int temperature;
    int powerUsage;
};

struct MinerStatus {
    std::string name;
    std::string status;
    double totalHashrate;
    std::vector<DeviceStatus> devices;
    std::vector<std::string> lastLogs;
};

class Orchestrator {
public:
    Orchestrator();
    ~Orchestrator();

    void startMiner(const std::string& minerName, const std::string& coin);
    void stopMiner(const std::string& minerName);
    void setDeviceEnabled(const std::string& deviceId, bool enabled);
    std::vector<MinerStatus> getAllStatus();

    void updateMiningStrategy(const std::string& coin);
    void setMultiAgentEnabled(bool enabled);
    bool isMultiAgentEnabled() const { return m_multiAgentActive; }

    PriorityMatrix getSharedPriority() const { return m_aiManager->getSharedPriority(); }

private:
    void monitorHardware();
    void runAILoop();
    void parseLogLine(const std::string& minerName, const std::string& line);

    std::map<std::string, MinerStatus> m_minerStatuses;
    std::map<std::string, std::unique_ptr<ProcessRunner>> m_runners;
    std::mutex m_mutex;
    bool m_running;
    bool m_multiAgentActive;

    std::unique_ptr<MultiModelManager> m_aiManager;
    std::unique_ptr<Scraper> m_scraper;
    std::unique_ptr<AnalyticsManager> m_analytics;

    const std::string m_placeholderWallet = "44AFFq5kSiGBo3SBYM76BXDHF... (Demo Only)";
    const std::string m_defaultPool = "moneroocean.stream:10128";
};

#endif
