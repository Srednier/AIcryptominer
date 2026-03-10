#ifndef AIEXTENSIONS_HPP
#define AIEXTENSIONS_HPP

#include <string>
#include <vector>

class SentimentAnalyzer {
public:
    double analyzeHype(const std::string& coin);
private:
    std::vector<std::string> mockNews = {"PUMP", "MOON", "CRASH", "ADOPTION", "RECOVERY"};
};

class EfficiencyTuner {
public:
    double calculateEfficiency(double hashrate, double powerUsage);
    void suggestTweaks(double efficiency);
};

#endif

class PredictiveMaintenance {
public:
    bool predictFailure(int currentTemp, int fanSpeed);
private:
    std::vector<int> tempHistory;
};
