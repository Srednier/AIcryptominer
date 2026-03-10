#include <cassert>
#include <iostream>
#include "Analytics.hpp"

void testAnalytics() {
    AnalyticsManager am;
    auto history = am.getHistory(7);
    assert(history.size() == 7);
    std::cout << "Analytics test passed!" << std::endl;
}

int main() {
    testAnalytics();
    return 0;
}
