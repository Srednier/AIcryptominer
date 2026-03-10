cmake_minimum_required(VERSION 3.10)
project(AI_Crypto_Miner_Backend)

set(CMAKE_CXX_STANDARD 17)

include_directories(include)

add_executable(miner_backend
    src/main.cpp
    src/Orchestrator.cpp
    src/Scraper.cpp
    src/Agent.cpp
    src/Downloader.cpp
    src/ProcessRunner.cpp
)
