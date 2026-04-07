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
exports.Description = void 0;
var index_shared_domin_1 = require("../../../../shared/domain/index-shared-domin");
var Description = /** @class */ (function (_super) {
    __extends(Description, _super);
    function Description(value) {
        var _this = this;
        var normalized = value.trim();
        _this = _super.call(this, normalized) || this;
        _this.ensuereIsValidDescription();
        return _this;
    }
    Description.prototype.ensuereIsValidDescription = function () {
        if (this.value === '') {
            throw new Error('Description cannot be empty');
        }
        if (this.value.length < 5 || this.value.length > 255) {
            throw new Error('Description must be between 5 and 255 characters');
        }
    };
    return Description;
}(index_shared_domin_1.ValueObject));
exports.Description = Description;
