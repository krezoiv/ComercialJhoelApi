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
exports.Persons = void 0;
var base_entity_1 = require("../../../../shared/domain/base-entity");
var Persons = /** @class */ (function (_super) {
    __extends(Persons, _super);
    function Persons(id, firstName, lastName, phoneNumber, email, createdAt, updatedAt, deletedAt) {
        var _this = _super.call(this, id, createdAt, updatedAt, deletedAt) || this;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.phoneNumber = phoneNumber;
        _this.email = email;
        return _this;
    }
    return Persons;
}(base_entity_1.BaseEntity));
exports.Persons = Persons;
