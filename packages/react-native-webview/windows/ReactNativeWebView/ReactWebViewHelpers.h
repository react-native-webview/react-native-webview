// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once 

#include <string>
#include <vector>
#include <map>

namespace ReactWebViewHelpers {
    std::string TrimString(const std::string& str);
    std::vector<std::string> SplitString(const std::string& str, const std::string& delim);
    std::map<std::string, std::string> ParseSetCookieHeader(const std::string& setCookieHeader);
}