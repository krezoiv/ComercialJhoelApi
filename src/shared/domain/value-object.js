"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
var ValueObject = /** @class */ (function () {
    function ValueObject(value) {
        this._value = value;
    }
    Object.defineProperty(ValueObject.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    ValueObject.prototype.equals = function (vo) {
        return JSON.stringify(this._value) === JSON.stringify(vo._value);
    };
    ValueObject.prototype.toString = function () {
        return String(this._value);
    };
    return ValueObject;
}());
exports.ValueObject = ValueObject;
