#include "RemoteAPI.hpp"
#include <iostream>
#include <chrono>

RemoteAPI::RemoteAPI(Orchestrator* orch) : m_orch(orch), m_running(false) {}

void RemoteAPI::startServer(const APIConfig& config) {
    m_config = config;
    if (m_config.enabled) {
        m_running = true;
        std::cout << "[REMOTE] API Server listening on port " << m_config.port << std::endl;
        std::cout << "[REMOTE] Secure Key Authentication: ACTIVE (" << m_config.apiKey.substr(0, 4) << "....)" << std::endl;
    }
}

void RemoteAPI::stopServer() {
    m_running = false;
    std::cout << "[REMOTE] API Server SHUTDOWN." << std::endl;
}

std::string RemoteAPI::handleStatusRequest(const std::string& key) {
    if (!authenticate(key)) return "{\"error\": \"UNAUTHORIZED\"}";

    // Remote status reporting
    std::cout << "[REMOTE] Handling remote status polling request." << std::endl;
    auto statuses = m_orch->getAllStatus();

    // JSON generation logic (mock)
    std::string json = "{\"status\": \"Online\", \"hashrate\": \"52.1 MH/s\", \"temp\": \"68C\"}";
    return json;
}

std::string RemoteAPI::handleControlRequest(const std::string& key, const std::string& action) {
    if (!authenticate(key)) return "{\"error\": \"UNAUTHORIZED\"}";

    std::cout << "[REMOTE] REMOTE CONTROL COMMAND: " << action << std::endl;
    if (action == "STOP_ALL") m_orch->stopMiner("TeamRedMiner");
    if (action == "EMERGENCY_HALT") m_orch->stopMiner("XMRig");

    return "{\"success\": true}";
}

bool RemoteAPI::authenticate(const std::string& key) {
    return key == m_config.apiKey;
}
