#include "MultiModelManager.hpp"
#include <iostream>

AgentSpecialist::AgentSpecialist(AgentType type) : m_type(type) {}

std::string AgentSpecialist::decide(const std::vector<double>& marketData, double sentiment, double efficiency, const PriorityMatrix& shared) {
    std::string decision = m_engine.runInference(marketData, sentiment, efficiency);

    // Adjust decision based on shared priority matrix
    if (shared.efficiencyPriority > 0.7 && m_type == AgentType::CPU_EFFICIENCY) {
        return "MAX_EFFICIENCY_IDLE";
    }

    if (m_type == AgentType::CPU_EFFICIENCY) {
        if (efficiency < 0.7) return "LOW_POWER_XMR";
        return decision;
    } else {
        if (sentiment > 0.6 || shared.marketPriority > 0.8) return "PUMP_ALGO_HIGH_VOLT";
        return decision;
    }
}

void AgentSpecialist::learn(ExperienceBuffer& buffer) {
    m_engine.train(buffer);
}

MultiModelManager::MultiModelManager() {
    m_cpuAgent = std::make_unique<AgentSpecialist>(AgentType::CPU_EFFICIENCY);
    m_gpuAgent = std::make_unique<AgentSpecialist>(AgentType::GPU_YIELD);
    m_sharedMatrix = {0.5, 0.5, 0.5}; // Balanced start
}

std::vector<AgentDecision> MultiModelManager::coordinate(const std::vector<double>& marketData,
                                                       double sentiment,
                                                       double cpuEfficiency,
                                                       double gpuEfficiency) {
    // Dynamic adjustment of shared priorities based on global state
    if (sentiment > 0.8) m_sharedMatrix.marketPriority += 0.05;
    if (cpuEfficiency < 0.4) m_sharedMatrix.efficiencyPriority += 0.05;

    std::vector<AgentDecision> decisions;

    decisions.push_back({AgentType::CPU_EFFICIENCY,
                         m_cpuAgent->decide(marketData, sentiment, cpuEfficiency, m_sharedMatrix),
                         0.85});

    decisions.push_back({AgentType::GPU_YIELD,
                         m_gpuAgent->decide(marketData, sentiment, gpuEfficiency, m_sharedMatrix),
                         0.92});

    std::cout << "[MULTI-AGENT] Coordinated " << decisions.size() << " specialists using PriorityMatrix." << std::endl;
    return decisions;
}

void MultiModelManager::trainAll(ExperienceBuffer& cpuBuffer, ExperienceBuffer& gpuBuffer) {
    std::cout << "[MULTI-AGENT] Starting joint training session..." << std::endl;
    m_cpuAgent->learn(cpuBuffer);
    m_gpuAgent->learn(gpuBuffer);
}
