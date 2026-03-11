cmake_minimum_required(VERSION 3.10)
project(AI_Crypto_Miner_Backend)

set(CMAKE_CXX_STANDARD 17)

include_directories(include)

add_library(miner_lib STATIC
    src/Orchestrator.cpp
    src/Scraper.cpp
    src/Agent.cpp
    src/Downloader.cpp
    src/ProcessRunner.cpp
    src/Analytics.cpp
    src/SmartGuard.cpp
    src/NeuralEngine.cpp
    src/AIExtensions.cpp
    src/ExperienceBuffer.cpp
    src/AdvancedAI.cpp
    src/MultiModelManager.cpp
)

add_executable(miner_backend src/main.cpp)
target_link_libraries(miner_backend miner_lib)

add_executable(test_multimodel src/test_multimodel.cpp)
target_link_libraries(test_multimodel miner_lib)

add_executable(test_neural src/test_neural.cpp)
target_link_libraries(test_neural miner_lib)

add_executable(test_training src/test_training.cpp)
target_link_libraries(test_training miner_lib)

add_executable(test_orchestrator src/test_orchestrator.cpp)
target_link_libraries(test_orchestrator miner_lib)
