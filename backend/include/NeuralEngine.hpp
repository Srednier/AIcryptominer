#ifndef NEURALENGINE_HPP
#define NEURALENGINE_HPP

#include <vector>
#include <string>
#include <map>
#include "ExperienceBuffer.hpp"

struct AIWeights {
    double marketWeight;
    double sentimentWeight;
    double efficiencyWeight;
};

class NeuralEngine {
public:
    NeuralEngine();

    std::string runInference(const std::vector<double>& marketData,
                            double sentimentScore,
                            double currentEfficiency);

    void train(ExperienceBuffer& buffer);

    AIWeights getCurrentPriorities() const;
    double getEpsilon() const { return m_epsilon; }

private:
    AIWeights m_weights;
    double m_epsilon; // Exploration rate
    double m_learningRate;
};

#endif
