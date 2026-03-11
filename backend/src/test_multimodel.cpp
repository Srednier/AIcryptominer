#include "MultiModelManager.hpp"
#include "ExperienceBuffer.hpp"
#include <iostream>
#include <cassert>

int main() {
    MultiModelManager manager;
    std::vector<double> marketData = {50000.0, 1.0, 0.5}; // Mock data

    std::cout << "Testing Multi-Agent coordination..." << std::endl;
    auto decisions = manager.coordinate(marketData, 0.9, 0.8, 0.8);

    assert(decisions.size() == 2);

    bool foundCPU = false;
    bool foundGPU = false;
    for (const auto& d : decisions) {
        if (d.type == AgentType::CPU_EFFICIENCY) foundCPU = true;
        if (d.type == AgentType::GPU_YIELD) foundGPU = true;
        std::cout << "Agent Decision: " << d.action << " (Confidence: " << d.confidence << ")" << std::endl;
    }

    assert(foundCPU && foundGPU);

    std::cout << "Testing PriorityMatrix propagation..." << std::endl;
    auto shared = manager.getSharedPriority();
    assert(shared.marketPriority > 0.5); // Should have increased due to high sentiment (0.9)

    std::cout << "Multi-Agent System Backend Verification PASSED" << std::endl;
    return 0;
}
