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
exports.Name = void 0;
var index_shared_domin_1 = require("../../../../shared/domain/index-shared-domin");
var Name = /** @class */ (function (_super) {
    __extends(Name, _super);
    function Name(value) {
        var _this = this;
        var normalized = value.trim();
        _this = _super.call(this, normalized) || this;
        _this.ensuereIsValidName();
        return _this;
    }
    Name.prototype.ensuereIsValidName = function () {
        if (this.value === '') {
            throw new Error('Name cannot be empty');
        }
        if (this.value.length < 2 || this.value.length > 50) {
            throw new Error('Name must be between 2 and 50 characters');
        }
        var nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
        if (!nameRegex.test(this.value)) {
            throw new Error('Name contains invalid characters');
        }
    };
    return Name;
}(index_shared_domin_1.ValueObject));
exports.Name = Name;
