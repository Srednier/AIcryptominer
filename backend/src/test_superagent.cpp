#include "SwarmManager.hpp"
#include "HardwareTuner.hpp"
#include <iostream>
#include <cassert>

int main() {
    SwarmManager swarm;
    HardwareTuner tuner;

    std::cout << "Testing Swarm Consensus..." << std::endl;
    SwarmExperience exp;
    exp.reward = 2.5;
    exp.validatorIds = {"V1", "V2", "V3"};
    assert(swarm.validateConsensus(exp) == true);

    std::cout << "Testing Deep Tuning Sweet Spot..." << std::endl;
    auto sweet = tuner.findSweetSpot("gpu_0", 0.95);
    assert(sweet.efficiencyScore > 0.9);
    assert(tuner.applyProfile(sweet) == true);

    std::cout << "Super-Agent System Verification PASSED" << std::endl;
    return 0;
}
