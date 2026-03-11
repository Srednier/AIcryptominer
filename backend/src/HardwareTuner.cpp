#include "HardwareTuner.hpp"
#include <iostream>
#include <random>

HardwareTuner::HardwareTuner() {
    // Initial default profiles
    m_currentProfiles["gpu_0"] = {"gpu_0", 2200, 2100, 950, 250, 0.0};
}

bool HardwareTuner::applyProfile(const TuningProfile& profile) {
    std::cout << "[TUNER] Applying Deep Hardware Tuning to " << profile.deviceId << std::endl;
    std::cout << "[TUNER] Core: " << profile.coreClockMHz << "MHz, Mem: " << profile.memoryClockMHz << "MHz" << std::endl;
    std::cout << "[TUNER] Voltage: " << profile.voltageMv << "mV (Low-level AMD API used)" << std::endl;

    // Simulate low-level hardware communication
    if (setAMDVoltage(profile.deviceId, profile.voltageMv) &&
        setAMDCocks(profile.deviceId, profile.coreClockMHz, profile.memoryClockMHz)) {
        m_currentProfiles[profile.deviceId] = profile;
        return true;
    }
    return false;
}

TuningProfile HardwareTuner::findSweetSpot(const std::string& deviceId, double targetEfficiency) {
    std::cout << "[TUNER] AI is sweeping for the efficiency 'Sweet Spot' for " << deviceId << "..." << std::endl;

    // Efficiency search simulation
    TuningProfile sweet;
    sweet.deviceId = deviceId;
    sweet.coreClockMHz = 1800 + (rand() % 400);
    sweet.memoryClockMHz = 2000 + (rand() % 200);
    sweet.voltageMv = 850 + (rand() % 100);
    sweet.powerLimitWatts = 150 + (rand() % 100);
    sweet.efficiencyScore = 0.92;

    return sweet;
}

void HardwareTuner::applyAISafeTuning(const std::string& deviceId, double load) {
    if (load > 0.9) {
        std::cout << "[TUNER] HIGH LOAD DETECTED: AI shifting to High-Yield Power Profile." << std::endl;
        TuningProfile p = {"gpu_0", 2400, 2150, 1050, 280, 0.8};
        applyProfile(p);
    } else {
        std::cout << "[TUNER] OPTIMIZING FOR POWER: AI shifting to Eco-Sweet-Spot Profile." << std::endl;
        TuningProfile p = {"gpu_0", 1900, 2050, 880, 180, 0.98};
        applyProfile(p);
    }
}

bool HardwareTuner::setAMDVoltage(const std::string& id, int mv) {
    // Windows ADL/AMD PowerPlay mock
    std::cout << "[WINAPI] ADL_Overdrive8_Voltage_Set -> " << mv << "mv" << std::endl;
    return true;
}

bool HardwareTuner::setAMDCocks(const std::string& id, int core, int mem) {
    // Windows ADL mock
    std::cout << "[WINAPI] ADL_Overdrive8_Frequency_Set -> Core:" << core << ", Mem:" << mem << std::endl;
    return true;
}

std::vector<TuningProfile> HardwareTuner::getActiveTuning() {
    std::vector<TuningProfile> profiles;
    for (auto const& [id, p] : m_currentProfiles) profiles.push_back(p);
    return profiles;
}
