"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolsMapper = void 0;
var crypto_1 = require("crypto");
var index_rols_domain_1 = require("../../domain/index-rols-domain");
var RolsMapper = /** @class */ (function () {
    function RolsMapper() {
    }
    RolsMapper.toEntity = function (input) {
        var id = new index_rols_domain_1.RolId((0, crypto_1.randomUUID)());
        var name = new index_rols_domain_1.Name(input.name);
        var description = new index_rols_domain_1.Description(input.description);
        var now = new Date();
        return new index_rols_domain_1.Rols(id, name, description, now, now, null);
    };
    RolsMapper.toResponseDto = function (rol) {
        return {
            id: rol.id.value,
            name: rol.name.value,
            description: rol.description.value,
            createdAt: rol.createdAt,
            updatedAt: rol.updatedAt,
        };
    };
    return RolsMapper;
}());
exports.RolsMapper = RolsMapper;
