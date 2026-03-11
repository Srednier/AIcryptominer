#ifndef HARDWARETUNER_HPP
#define HARDWARETUNER_HPP

#include <string>
#include <vector>
#include <map>

struct TuningProfile {
    std::string deviceId;
    int coreClockMHz;
    int memoryClockMHz;
    int voltageMv;
    int powerLimitWatts;
    double efficiencyScore;
};

class HardwareTuner {
public:
    HardwareTuner();
    bool applyProfile(const TuningProfile& profile);
    TuningProfile findSweetSpot(const std::string& deviceId, double targetEfficiency);

    std::vector<TuningProfile> getActiveTuning();

    void applyAISafeTuning(const std::string& deviceId, double load);

private:
    bool setAMDVoltage(const std::string& id, int mv);
    bool setAMDCocks(const std::string& id, int core, int mem);

    std::map<std::string, TuningProfile> m_currentProfiles;
};

#endif
