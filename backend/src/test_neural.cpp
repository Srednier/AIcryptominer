#include <cassert>
#include <iostream>
#include "NeuralEngine.hpp"

void testNeural() {
    NeuralEngine engine;
    auto priorities = engine.getCurrentPriorities();
    assert(priorities.marketWeight > 0);

    std::string decision = engine.runInference({2500.0}, 0.9, 0.4);
    assert(decision == "GEM_COIN_PUMP");

    std::cout << "NeuralEngine test passed!" << std::endl;
}

int main() {
    testNeural();
    return 0;
}
