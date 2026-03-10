#include "SmartGuard.hpp"
#include <iostream>

SmartGuard::SmartGuard() {}

void SmartGuard::sendWebhook(const std::string& url, const std::string& message) {
    std::cout << "[WEBHOOK SENT] " << message << " to " << url << std::endl;
    // Real implementation would use libcurl for POST
}

bool SmartGuard::shouldMine(double estimatedProfit, double electricityCost) {
    if (estimatedProfit < electricityCost) {
        std::cout << "[SAFEGUARD] Profit (" << estimatedProfit << ") < Cost (" << electricityCost << "). Stopping." << std::endl;
        return false;
    }
    return true;
}

bool SmartGuard::checkOverheat(int currentTemp, int maxTemp) {
    if (currentTemp >= maxTemp) {
        std::cout << "[SAFEGUARD] Overheat detected! " << currentTemp << "C >= " << maxTemp << "C" << std::endl;
        return true;
    }
    return false;
}
