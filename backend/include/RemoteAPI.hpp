#ifndef REMOTEAPI_HPP
#define REMOTEAPI_HPP

#include <string>
#include <vector>
#include <map>
#include <memory>
#include "Orchestrator.hpp"

struct APIConfig {
    int port;
    std::string apiKey;
    bool enabled;
};

class RemoteAPI {
public:
    RemoteAPI(Orchestrator* orch);
    void startServer(const APIConfig& config);
    void stopServer();

    // API Endpoints
    std::string handleStatusRequest(const std::string& key);
    std::string handleControlRequest(const std::string& key, const std::string& action);

private:
    Orchestrator* m_orch;
    APIConfig m_config;
    bool m_running;

    bool authenticate(const std::string& key);
};

#endif
