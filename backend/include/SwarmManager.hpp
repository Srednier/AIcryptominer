#ifndef SWARMMANAGER_HPP
#define SWARMMANAGER_HPP

#include <vector>
#include <string>
#include <map>
#include "ExperienceBuffer.hpp"

struct PeerInfo {
    std::string id;
    std::string ip;
    std::string gpuModel;
    double contributionScore;
};

struct SwarmExperience : Experience {
    std::string hardwareFingerprint;
    std::string reporterId;
    std::vector<std::string> validatorIds;
};

class SwarmManager {
public:
    SwarmManager();
    void broadcastExperience(const SwarmExperience& exp);
    void syncPeers();
    std::vector<SwarmExperience> fetchGlobalKnowledge();

    void addPeer(const PeerInfo& peer);
    std::vector<PeerInfo> getActivePeers() const;

    bool validateConsensus(const SwarmExperience& exp);

private:
    std::vector<PeerInfo> m_peers;
    std::map<std::string, std::vector<SwarmExperience>> m_globalKnowledge;
    std::string m_localId;
};

#endif
