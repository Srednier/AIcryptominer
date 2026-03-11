#include "Analytics.hpp"
#include <ctime>
#include <iomanip>
#include <sstream>

AnalyticsManager::AnalyticsManager() {
    // Seed with some mock historical data for the 7/30 day view
    for (int i = 30; i >= 0; --i) {
        std::stringstream ss;
        ss << "2026-01-" << std::setw(2) << std::setfill('0') << (14 - i + 30) % 31;
        double base = 10.0 + (rand() % 50) / 10.0;
        m_history.push_back({ss.str(), base + (rand() % 20) / 10.0, base});
    }
}

void AnalyticsManager::recordEarning(double amount, bool isAiOptimized) {
    // In a real app, this would append to a SQLite database
    if (!m_history.empty()) {
        if (isAiOptimized) m_history.back().aiYield += amount;
        else m_history.back().fixedYield += amount;
    }
}

std::vector<YieldPoint> AnalyticsManager::getHistory(int days) {
    if (days >= m_history.size()) return m_history;
    return std::vector<YieldPoint>(m_history.end() - days, m_history.end());
}
