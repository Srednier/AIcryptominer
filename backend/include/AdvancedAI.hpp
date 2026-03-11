#ifndef ADVANCEDAI_HPP
#define ADVANCEDAI_HPP

#include <vector>
#include <string>
#include <memory>
#include "ExperienceBuffer.hpp"

enum class AIAlgorithm { DQN, PPO };

class SpecialistModel {
public:
    virtual ~SpecialistModel() = default;
    virtual std::string predict(const std::vector<double>& state, double epsilon) = 0;
    virtual void train(ExperienceBuffer& buffer) = 0;
    virtual std::string getName() const = 0;
};

class CPUSpecialist : public SpecialistModel {
public:
    std::string predict(const std::vector<double>& state, double epsilon) override;
    void train(ExperienceBuffer& buffer) override;
    std::string getName() const override { return "CPU Specialist (Efficiency-Focus)"; }
};

class GPUSpecialist : public SpecialistModel {
public:
    std::string predict(const std::vector<double>& state, double epsilon) override;
    void train(ExperienceBuffer& buffer) override;
    std::string getName() const override { return "GPU Specialist (Yield-Focus)"; }
};

#endif
