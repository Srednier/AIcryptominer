#ifndef DOWNLOADER_HPP
#define DOWNLOADER_HPP

#include <string>
#include <functional>

class MinerDownloader {
public:
    MinerDownloader();

    // progressCallback: (bytesDownloaded, totalBytes)
    bool downloadXMRig(std::function<void(long, long)> progressCallback);
    bool downloadTeamRedMiner(std::function<void(long, long)> progressCallback);

private:
    bool downloadFile(const std::string& url, const std::string& dest);
    bool extractZip(const std::string& zipPath, const std::string& destDir);
};

#endif
