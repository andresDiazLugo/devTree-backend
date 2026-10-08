"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = isValidUrl;
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (error) {
        return false;
    }
}
//# sourceMappingURL=validUrl.js.map