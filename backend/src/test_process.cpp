#include <cassert>
#include <iostream>
#include "ProcessRunner.hpp"

void testProcess() {
    ProcessRunner runner;
    bool success = runner.launch("test_miner", {"-arg"}, [](const std::string& line) {
        std::cout << "Received: " << line << std::endl;
    });
    assert(success);
    assert(runner.isRunning());
    std::this_thread::sleep_for(std::chrono::seconds(1));
    runner.stop();
    assert(!runner.isRunning());
    std::cout << "ProcessRunner test passed!" << std::endl;
}

int main() {
    testProcess();
    return 0;
}
