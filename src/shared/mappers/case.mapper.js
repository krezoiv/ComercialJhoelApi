"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseMapper = void 0;
var CaseMapper = /** @class */ (function () {
    function CaseMapper() {
    }
    CaseMapper.toCamelCase = function (obj) {
        var _this = this;
        // ✅ arrays
        if (Array.isArray(obj)) {
            return obj.map(function (item) { return _this.toCamelCase(item); });
        }
        // ✅ detectar Date real
        if (obj instanceof Date) {
            return obj;
        }
        // ✅ detectar objetos vacíos (tu caso)
        if (obj !== null &&
            typeof obj === 'object' &&
            Object.keys(obj).length === 0) {
            return null; // 🔥 AQUÍ ESTÁ LA MAGIA
        }
        // ✅ objetos normales
        if (obj !== null && typeof obj === 'object') {
            var result = {};
            for (var key in obj) {
                var camelKey = key.replace(/_([a-z])/g, function (_, letter) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                    return letter.toUpperCase();
                });
                var value = obj[key];
                result[camelKey] = this.toCamelCase(value);
            }
            return result;
        }
        return obj;
    };
    return CaseMapper;
}());
exports.CaseMapper = CaseMapper;
