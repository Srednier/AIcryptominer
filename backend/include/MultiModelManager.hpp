#ifndef MULTIMODELMANAGER_HPP
#define MULTIMODELMANAGER_HPP

#include <vector>
#include <string>
#include <memory>
#include <map>
#include "NeuralEngine.hpp"

enum class AgentType {
    CPU_EFFICIENCY,
    GPU_YIELD
};

struct AgentDecision {
    AgentType type;
    std::string action;
    double confidence;
};

// Shared state between agents
struct PriorityMatrix {
    double marketPriority;
    double efficiencyPriority;
    double stabilityPriority;
};

class AgentSpecialist {
public:
    AgentSpecialist(AgentType type);
    std::string decide(const std::vector<double>& marketData, double sentiment, double efficiency, const PriorityMatrix& shared);
    void learn(ExperienceBuffer& buffer);
    AgentType getType() const { return m_type; }
    double getEpsilon() const { return m_engine.getEpsilon(); }

private:
    AgentType m_type;
    NeuralEngine m_engine;
};

class MultiModelManager {
public:
    MultiModelManager();
    std::vector<AgentDecision> coordinate(const std::vector<double>& marketData,
                                        double sentiment,
                                        double cpuEfficiency,
                                        double gpuEfficiency);
    void trainAll(ExperienceBuffer& cpuBuffer, ExperienceBuffer& gpuBuffer);
    PriorityMatrix getSharedPriority() const { return m_sharedMatrix; }

private:
    std::unique_ptr<AgentSpecialist> m_cpuAgent;
    std::unique_ptr<AgentSpecialist> m_gpuAgent;
    PriorityMatrix m_sharedMatrix;
};

#endif
