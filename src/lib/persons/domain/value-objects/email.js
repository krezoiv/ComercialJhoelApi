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
exports.Email = void 0;
var index_shared_domin_1 = require("../../../../shared/domain/index-shared-domin");
var index_errors_1 = require("../../../../shared/errors/index-errors");
var Email = /** @class */ (function (_super) {
    __extends(Email, _super);
    function Email(value) {
        var _this = this;
        var normalized = value.trim().toLowerCase();
        _this = _super.call(this, normalized) || this;
        _this.ensureIsValidEmail();
        return _this;
    }
    Email.prototype.ensureIsValidEmail = function () {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            throw new index_errors_1.ValidationError('Formatro de correo inválido');
        }
        if (this.value.length > 255) {
            throw new index_errors_1.ValidationError('Correo no puede tener más de 255 caracteres');
        }
    };
    return Email;
}(index_shared_domin_1.ValueObject));
exports.Email = Email;
