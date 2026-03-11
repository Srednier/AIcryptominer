#include "ExperienceBuffer.hpp"
#include <random>
#include <algorithm>
#include <numeric>

ExperienceBuffer::ExperienceBuffer(size_t maxSize) : m_maxSize(maxSize) {}

void ExperienceBuffer::add(const Experience& exp) {
    if (m_buffer.size() >= m_maxSize) {
        m_buffer.erase(m_buffer.begin());
    }
    m_buffer.push_back(exp);
}

std::vector<Experience> ExperienceBuffer::sample(size_t batchSize) {
    std::vector<Experience> batch;
    size_t actualBatchSize = std::min(batchSize, m_buffer.size());
    if (actualBatchSize == 0) return batch;

    std::vector<size_t> indices(m_buffer.size());
    std::iota(indices.begin(), indices.end(), 0);

    std::random_device rd;
    std::mt19937 g(rd());
    std::shuffle(indices.begin(), indices.end(), g);

    for (size_t i = 0; i < actualBatchSize; ++i) {
        batch.push_back(m_buffer[indices[i]]);
    }
    return batch;
}
