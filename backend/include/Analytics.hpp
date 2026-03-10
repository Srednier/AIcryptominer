#ifndef ANALYTICS_HPP
#define ANALYTICS_HPP

#include <vector>
#include <string>
#include <map>

struct YieldPoint {
    std::string date;
    double aiYield;
    double fixedYield;
};

class AnalyticsManager {
public:
    AnalyticsManager();
    void recordEarning(double amount, bool isAiOptimized);
    std::vector<YieldPoint> getHistory(int days);

private:
    std::vector<YieldPoint> m_history;
};

#endif
