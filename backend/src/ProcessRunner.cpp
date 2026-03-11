#include "ProcessRunner.hpp"
#include <iostream>
#include <iostream>
#include <cstdio>
#include <memory>
#include <array>

ProcessRunner::ProcessRunner() : m_running(false) {}

ProcessRunner::~ProcessRunner() {
    stop();
}

bool ProcessRunner::launch(const std::string& command, const std::vector<std::string>& args,
                          std::function<void(const std::string&)> onOutput) {
    if (m_running) return false;

    m_running = true;

    // Construct command line
    std::string fullCmd = command;
    for (const auto& arg : args) {
        fullCmd += " " + arg;
    }

    std::cout << "[EXECUTING] " << fullCmd << std::endl;

    // Cross-platform logic (mocked for Linux sandbox)
    m_readerThread = std::thread([this, fullCmd, onOutput]() {
        // In a real Windows environment, this would use CreateProcess and a pipe for stdout
        // For simulation, we'll emulate the output

        onOutput("Initializing miner core...");
        std::this_thread::sleep_for(std::chrono::seconds(1));
        onOutput("Connecting to pool: moneroocean.stream:10128");

        int i = 0;
        while (m_running && i < 100) {
            std::this_thread::sleep_for(std::chrono::seconds(2));
            std::string hashrate = std::to_string(45 + (rand() % 10));
            onOutput("Accepted share (32ms) | Hashrate: " + hashrate + " MH/s | Temp: 62C");
            i++;
        }
    });

    return true;
}

void ProcessRunner::stop() {
    m_running = false;
    if (m_readerThread.joinable()) {
        m_readerThread.join();
    }
    // In real Windows: TerminateProcess(m_processHandle, 0);
}

bool ProcessRunner::isRunning() const {
    return m_running;
}
