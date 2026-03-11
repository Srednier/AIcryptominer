#include "AIExtensions.hpp"
#include <iostream>
#include <random>

double SentimentAnalyzer::analyzeHype(const std::string& coin) {
    // Simulated sentiment analysis of social media / news
    // In real app, this would use an NLP model or an API
    double score = (rand() % 100) / 100.0;
    std::cout << "[SENTIMENT] " << coin << " hype score: " << score << std::endl;
    return score;
}

double EfficiencyTuner::calculateEfficiency(double hashrate, double powerUsage) {
    if (powerUsage <= 0) return 0;
    return hashrate / powerUsage;
}

void EfficiencyTuner::suggestTweaks(double efficiency) {
    if (efficiency < 0.3) {
        std::cout << "[TUNER] Efficiency low. Suggesting undervolt and clock reduction." << std::endl;
    } else {
        std::cout << "[TUNER] Efficiency optimal. Maintaining current clocks." << std::endl;
    }
}

bool PredictiveMaintenance::predictFailure(int currentTemp, int fanSpeed) {
    // Simulated anomaly detection
    if (currentTemp > 80 && fanSpeed < 1500) {
        std::cout << "[PREDICTIVE] High temp + Low fan detected! Potential fan failure predicted." << std::endl;
        return true;
    }
    return false;
}
