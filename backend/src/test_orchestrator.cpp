#include <cassert>
#include <iostream>
#include "Orchestrator.hpp"

void testOrchestrator() {
    Orchestrator orch;
    orch.startMiner("TestMiner", "config");
    auto statuses = orch.getAllStatus();
    assert(statuses.size() == 1);
    assert(statuses[0].name == "TestMiner");
    std::cout << "Orchestrator test passed!" << std::endl;
}

int main() {
    testOrchestrator();
    return 0;
}
