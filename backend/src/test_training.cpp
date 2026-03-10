#include <cassert>
#include <iostream>
#include "NeuralEngine.hpp"
#include "ExperienceBuffer.hpp"
#include "SmartGuard.hpp"

void testTraining() {
    NeuralEngine engine;
    ExperienceBuffer buffer(100);
    RewardCalculator rewardCalc;

    // Fill buffer
    for(int i=0; i<20; ++i) {
        buffer.add({{1.0}, 0, rewardCalc.calculate(1.0, 0.4, true)});
    }

    double initialEpsilon = engine.getEpsilon();
    engine.train(buffer);
    assert(engine.getEpsilon() < initialEpsilon);

    std::cout << "Training logic test passed!" << std::endl;
}

int main() {
    testTraining();
    return 0;
}
