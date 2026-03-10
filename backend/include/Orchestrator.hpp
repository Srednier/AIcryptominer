#ifndef ORCHESTRATOR_HPP
#define ORCHESTRATOR_HPP

#include <string>
#include <vector>
#include <map>
#include <memory>

struct MinerStatus {
    std::string name;
    std::string status;
    double hashrate;
    int temperature;
    double load;
};

class Orchestrator {
public:
    Orchestrator();
    ~Orchestrator();

    void startMiner(const std::string& minerName, const std::string& config);
    void stopMiner(const std::string& minerName);
    std::vector<MinerStatus> getAllStatus();

    // AI Decision entry point
    void updateMiningStrategy(const std::string& coin);

private:
    void monitorHardware();
    std::map<std::string, MinerStatus> m_minerStatuses;
    bool m_running;
};

#endif
