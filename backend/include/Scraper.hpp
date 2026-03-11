#ifndef SCRAPER_HPP
#define SCRAPER_HPP

#include <string>
#include <map>

class Scraper {
public:
    Scraper();
    std::map<std::string, double> getMarketData(); // Coin -> Price/Difficulty score
private:
    std::string fetchUrl(const std::string& url);
};

#endif
