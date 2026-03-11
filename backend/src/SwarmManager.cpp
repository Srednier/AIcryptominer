#include "SwarmManager.hpp"
#include <iostream>
#include <random>
#include <algorithm>
#include <ctime>

SwarmManager::SwarmManager() : m_localId("LOCAL_" + std::to_string(std::time(0))) {
    // Initial bootstrap peer
    m_peers.push_back({"BOOTSTRAP_0", "45.122.33.11", "Any", 100.0});
}

void SwarmManager::broadcastExperience(const SwarmExperience& exp) {
    std::cout << "[SWARM] Broadcasting local experience to " << m_peers.size() << " peers." << std::endl;
    // P2P Gossip simulation
    for (const auto& peer : m_peers) {
        if (peer.id != m_localId) {
            std::cout << "[SWARM] Pushing learning update to peer: " << peer.id << std::endl;
        }
    }
}

void SwarmManager::syncPeers() {
    std::cout << "[SWARM] Peer Discovery Active: Syncing DHT..." << std::endl;
    // Mock peer discovery
    if (m_peers.size() < 10) {
        std::string newId = "PEER_" + std::to_string(m_peers.size());
        m_peers.push_back({newId, "192.168.1." + std::to_string(rand() % 255), "AMD RX 6800", 0.0});
    }
}

std::vector<SwarmExperience> SwarmManager::fetchGlobalKnowledge() {
    std::cout << "[SWARM] Downloading global consensus dataset..." << std::endl;
    std::vector<SwarmExperience> knowledge;

    // Simulate global knowledge with verified experiences
    for (int i = 0; i < 5; ++i) {
        SwarmExperience exp;
        exp.state = {0.8, 0.4, 0.9};
        exp.action = 1;
        exp.reward = 2.45;
        exp.hardwareFingerprint = "AMD_6000_SERIES";
        exp.reporterId = "REMOTE_VETERAN_0";
        exp.validatorIds = {"VALID_1", "VALID_2", "VALID_3"}; // Consensus met
        knowledge.push_back(exp);
    }
    return knowledge;
}

bool SwarmManager::validateConsensus(const SwarmExperience& exp) {
    // Check if enough trusted validators signed off
    if (exp.validatorIds.size() >= 3) {
        std::cout << "[SWARM] EXPERIENCE VALIDATED: Reward " << exp.reward << " accepted by consensus." << std::endl;
        return true;
    }
    std::cout << "[SWARM] WARNING: Experience rejected! Insufficient consensus signatures." << std::endl;
    return false;
}

void SwarmManager::addPeer(const PeerInfo& peer) {
    m_peers.push_back(peer);
}

std::vector<PeerInfo> SwarmManager::getActivePeers() const {
    return m_peers;
}
