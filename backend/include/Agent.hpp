#ifndef AGENT_HPP
#define AGENT_HPP

#include <vector>
#include <string>

// Simulating LibTorch integration for the plan
// In a real environment with LibTorch:
// #include <torch/torch.h>

class MiningAgent {
public:
    MiningAgent();
    std::string decideNextCoin(const std::vector<double>& marketState);
    void train(const std::vector<double>& state, int action, double reward);

private:
    // torch::nn::Sequential model;
};

#endif
