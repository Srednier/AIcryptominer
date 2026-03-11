#ifndef EXPERIENCEBUFFER_HPP
#define EXPERIENCEBUFFER_HPP

#include <vector>
#include <string>

struct Experience {
    std::vector<double> state;
    int action;
    double reward;
};

class ExperienceBuffer {
public:
    ExperienceBuffer(size_t maxSize);
    void add(const Experience& exp);
    std::vector<Experience> sample(size_t batchSize);
    size_t size() const { return m_buffer.size(); }

private:
    std::vector<Experience> m_buffer;
    size_t m_maxSize;
};

#endif
