/* eslint-disable react/no-multi-comp, max-classes-per-file */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from 'react';
var NativeWebViewMacOS = /** @class */ (function (_super) {
    __extends(NativeWebViewMacOS, _super);
    function NativeWebViewMacOS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NativeWebViewMacOS;
}(NativeWebViewMacOSBase));
export { NativeWebViewMacOS };
var NativeWebViewWindows = /** @class */ (function (_super) {
    __extends(NativeWebViewWindows, _super);
    function NativeWebViewWindows() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NativeWebViewWindows;
}(NativeWebViewWindowsBase));
export { NativeWebViewWindows };
