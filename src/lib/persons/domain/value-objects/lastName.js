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
exports.LastName = void 0;
var index_shared_domin_1 = require("../../../../shared/domain/index-shared-domin");
var index_errors_1 = require("../../../../shared/errors/index-errors");
var LastName = /** @class */ (function (_super) {
    __extends(LastName, _super);
    function LastName(value) {
        var _this = this;
        var normalized = value.trim();
        _this = _super.call(this, normalized) || this;
        _this.ensureIsValidLastName();
        return _this;
    }
    LastName.prototype.ensureIsValidLastName = function () {
        if (this.value === '') {
            throw new index_errors_1.ValidationError('apellido es requerido');
        }
        if (this.value.length < 2 || this.value.length > 50) {
            throw new index_errors_1.ValidationError('apellido debe ser entre 2 y 50 caracteres');
        }
        var nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
        if (!nameRegex.test(this.value)) {
            throw new index_errors_1.ValidationError('apellido contiene caracteres inválidos');
        }
    };
    return LastName;
}(index_shared_domin_1.ValueObject));
exports.LastName = LastName;
