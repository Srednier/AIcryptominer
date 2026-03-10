#ifndef PROCESS_RUNNER_HPP
#define PROCESS_RUNNER_HPP

#include <string>
#include <vector>
#include <functional>
#include <thread>
#include <atomic>

class ProcessRunner {
public:
    ProcessRunner();
    ~ProcessRunner();

    bool launch(const std::string& command, const std::vector<std::string>& args,
               std::function<void(const std::string&)> onOutput);
    void stop();
    bool isRunning() const;

private:
    std::atomic<bool> m_running;
    std::thread m_readerThread;
#ifdef _WIN32
    void* m_processHandle;
#endif
};

#endif
