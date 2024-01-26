// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#pragma once 

#include "winrt/ReactNativeWebView.h"

using namespace winrt::ReactNativeWebView;

namespace winrt::ReactNativeWebView::implementation {
    namespace ReactWebViewHelpers {
        std::string trimString(const std::string& str);
        std::vector<std::string> splitString(const std::string& str, const std::string& delim);
        std::map<std::string, std::string> parseSetCookieHeader(const std::string& setCookieHeader);
    }
} // namespace winrt::ReactNativeWebView::implementation