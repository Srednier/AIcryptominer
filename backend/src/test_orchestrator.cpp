#include <cassert>
#include <iostream>
#include "Orchestrator.hpp"

void testOrchestrator() {
    Orchestrator orch;
    orch.setMultiAgentEnabled(true);
    auto statuses = orch.getAllStatus();
    assert(statuses.size() >= 2);
    std::cout << "Orchestrator Multi-Agent setup passed!" << std::endl;
}

int main() {
    testOrchestrator();
    return 0; // Exit immediately to avoid long-running threads in tests
}
