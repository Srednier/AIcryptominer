#ifndef NEURALENGINE_HPP
#define NEURALENGINE_HPP

#include <vector>
#include <string>
#include <map>

// Placeholder for full LibTorch integration
struct AIWeights {
    double marketWeight;
    double sentimentWeight;
    double efficiencyWeight;
};

class NeuralEngine {
public:
    NeuralEngine();

    // Core decision logic
    std::string runInference(const std::vector<double>& marketData,
                            double sentimentScore,
                            double currentEfficiency);

    void train(double reward);

    AIWeights getCurrentPriorities() const;

private:
    AIWeights m_weights;
    // torch::nn::Sequential m_model;
};

#endif
