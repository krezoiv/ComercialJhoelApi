"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
var BaseEntity = /** @class */ (function () {
    function BaseEntity(id, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt !== null && deletedAt !== void 0 ? deletedAt : null;
    }
    BaseEntity.prototype.touch = function () {
        this.updatedAt = new Date();
    };
    BaseEntity.prototype.softDelete = function () {
        this.deletedAt = new Date();
    };
    BaseEntity.prototype.isDeleted = function () {
        return this.deletedAt !== null;
    };
    return BaseEntity;
}());
exports.BaseEntity = BaseEntity;
