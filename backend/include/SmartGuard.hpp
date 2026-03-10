#ifndef SMARTGUARD_HPP
#define SMARTGUARD_HPP

#include <string>

class SmartGuard {
public:
    SmartGuard();

    // Notifications
    void sendWebhook(const std::string& url, const std::string& message);

    // Safeguards
    bool shouldMine(double estimatedProfit, double electricityCost);
    bool checkOverheat(int currentTemp, int maxTemp);

private:
    // Helper to perform HTTP POST
    void postRequest(const std::string& url, const std::string& json);
};

#endif
