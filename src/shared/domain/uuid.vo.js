"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidValueObject = void 0;
var validation_error_1 = require("../errors/validation-error");
var value_object_1 = require("./value-object");
var UuidValueObject = /** @class */ (function (_super) {
    __extends(UuidValueObject, _super);
    function UuidValueObject(value) {
        var _this = this;
        var normalized = value === null || value === void 0 ? void 0 : value.toLowerCase();
        _this = _super.call(this, normalized) || this;
        _this.ensureIsValidUuid();
        return _this;
    }
    UuidValueObject.prototype.ensureIsValidUuid = function () {
        var uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(this.value)) {
            throw new validation_error_1.ValidationError('Invalid UUID format');
        }
    };
    return UuidValueObject;
}(value_object_1.ValueObject));
exports.UuidValueObject = UuidValueObject;
