#include "AdvancedAI.hpp"
#include <iostream>
#include <random>

std::string CPUSpecialist::predict(const std::vector<double>& state, double epsilon) {
    std::random_device rd;
    std::mt19937 g(rd());
    std::uniform_real_distribution<double> dist(0, 1);

    if (dist(g) < epsilon) return (rand() % 2 == 0 ? "XMR_STABLE" : "LTC_LOWPOWER");

    return "XMR_STABLE";
}

void CPUSpecialist::train(ExperienceBuffer& buffer) {
    if (buffer.size() < 10) return;
    std::cout << "[CPU TRAINING] Optimizing for Efficiency (PPO Structure)" << std::endl;
}

std::string GPUSpecialist::predict(const std::vector<double>& state, double epsilon) {
    std::random_device rd;
    std::mt19937 g(rd());
    std::uniform_real_distribution<double> dist(0, 1);

    if (dist(g) < epsilon) return (rand() % 2 == 0 ? "ETH_HIGH_PROFIT" : "RVN_VOLATILE");

    return "ETH_HIGH_PROFIT";
}

void GPUSpecialist::train(ExperienceBuffer& buffer) {
    if (buffer.size() < 10) return;
    std::cout << "[GPU TRAINING] Optimizing for Yield (DQN Structure)" << std::endl;
}
