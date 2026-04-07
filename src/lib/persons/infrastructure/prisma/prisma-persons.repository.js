"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPersonsRepository = void 0;
var common_1 = require("@nestjs/common");
var index_domain_1 = require("../../domain/index-domain");
var index_errors_1 = require("../../../../shared/errors/index-errors");
var PrismaPersonsRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PrismaPersonsRepository = _classThis = /** @class */ (function () {
        function PrismaPersonsRepository_1(_getAllPersonSp, _createPersonSp, _updatePersonSp, _getPersonByIdSp, _deletePersonSp) {
            this._getAllPersonSp = _getAllPersonSp;
            this._createPersonSp = _createPersonSp;
            this._updatePersonSp = _updatePersonSp;
            this._getPersonByIdSp = _getPersonByIdSp;
            this._deletePersonSp = _deletePersonSp;
        }
        PrismaPersonsRepository_1.prototype.create = function (person) {
            return __awaiter(this, void 0, void 0, function () {
                var result, created, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._createPersonSp.execute({
                                    firstName: person.firstName.value,
                                    lastName: person.lastName.value,
                                    phoneNumber: person.phoneNumber.value,
                                    email: person.email.value,
                                    //id: '',
                                })];
                        case 1:
                            result = _a.sent();
                            created = result[0];
                            if (!created) {
                                throw new index_errors_1.DomainError('No response from database');
                            }
                            // 🔥 MAPEO DE ERRORES DESDE SP
                            if (created.code !== 200) {
                                switch (created.code) {
                                    case 400:
                                        throw new index_errors_1.ValidationError(created.message);
                                    case 409:
                                        throw new index_errors_1.ConflictError(created.message);
                                    default:
                                        throw new index_errors_1.DomainError(created.message);
                                }
                            }
                            return [2 /*return*/, new index_domain_1.Persons(new index_domain_1.PersonId(created.id), new index_domain_1.FirstName(created.firstName), new index_domain_1.LastName(created.lastName), new index_domain_1.PhoneNumber(created.phoneNumber), new index_domain_1.Email(created.email), new Date(created.createdAt), new Date(created.updatedAt), created.deletedAt ? new Date(created.deletedAt) : null)];
                        case 2:
                            error_1 = _a.sent();
                            console.error(error_1);
                            // 👇 si ya es error de dominio, lo re-lanzas
                            if (error_1 instanceof index_errors_1.ConflictError ||
                                error_1 instanceof index_errors_1.ValidationError ||
                                error_1 instanceof index_errors_1.DomainError) {
                                throw error_1;
                            }
                            // 👇 error inesperado
                            throw new index_errors_1.DomainError('Unexpected error creating person');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PrismaPersonsRepository_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._getAllPersonSp.execute()];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data.map(function (item) {
                                    return new index_domain_1.Persons(new index_domain_1.PersonId(item.id), new index_domain_1.FirstName(item.firstName), new index_domain_1.LastName(item.lastName), new index_domain_1.PhoneNumber(item.phoneNumber), new index_domain_1.Email(item.email), new Date(item.createdAt), new Date(item.updatedAt), item.deletedAt ? new Date(item.deletedAt) : null);
                                })];
                        case 2:
                            error_2 = _a.sent();
                            console.error(error_2);
                            throw new Error('Error fetching persons from SP');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PrismaPersonsRepository_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result, person, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._getPersonByIdSp.execute({
                                    id: id.value,
                                })];
                        case 1:
                            result = _a.sent();
                            person = result[0];
                            // 🔥 NOT FOUND → null (no exception)
                            if (!person || person.code === 404) {
                                return [2 /*return*/, null];
                            }
                            // 🔥 otros errores
                            if (person.code !== 200) {
                                throw new index_errors_1.DomainError(person.message);
                            }
                            // 🔥 validación crítica
                            if (!person.id) {
                                throw new index_errors_1.DomainError('SP did not return valid person');
                            }
                            return [2 /*return*/, new index_domain_1.Persons(new index_domain_1.PersonId(person.id), new index_domain_1.FirstName(person.firstName), new index_domain_1.LastName(person.lastName), new index_domain_1.PhoneNumber(person.phoneNumber), new index_domain_1.Email(person.email), new Date(person.createdAt), new Date(person.updatedAt), person.deletedAt ? new Date(person.deletedAt) : null)];
                        case 2:
                            error_3 = _a.sent();
                            console.error(error_3);
                            if (error_3 instanceof index_errors_1.DomainError) {
                                throw error_3;
                            }
                            throw new index_errors_1.DomainError('Error fetching person');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PrismaPersonsRepository_1.prototype.update = function (person) {
            return __awaiter(this, void 0, void 0, function () {
                var result, updated, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._updatePersonSp.execute({
                                    id: person.id.value,
                                    firstName: person.firstName.value,
                                    lastName: person.lastName.value,
                                    phoneNumber: person.phoneNumber.value,
                                    email: person.email.value,
                                })];
                        case 1:
                            result = _a.sent();
                            updated = result[0];
                            if (!updated) {
                                throw new index_errors_1.DomainError('No response from database');
                            }
                            // 🔥 MAPEO DE ERRORES
                            if (updated.code !== 200) {
                                switch (updated.code) {
                                    case 400:
                                        throw new index_errors_1.ValidationError(updated.message);
                                    case 404:
                                        throw new index_errors_1.NotFoundError('Person');
                                    case 409:
                                        throw new index_errors_1.ConflictError(updated.message);
                                    default:
                                        throw new index_errors_1.DomainError(updated.message);
                                }
                            }
                            // 🔥 MAPEO A ENTITY
                            return [2 /*return*/, new index_domain_1.Persons(new index_domain_1.PersonId(updated.id), new index_domain_1.FirstName(updated.firstName), new index_domain_1.LastName(updated.lastName), new index_domain_1.PhoneNumber(updated.phoneNumber), new index_domain_1.Email(updated.email), new Date(updated.createdAt), new Date(updated.updatedAt), updated.deletedAt ? new Date(updated.deletedAt) : null)];
                        case 2:
                            error_4 = _a.sent();
                            console.error(error_4);
                            if (error_4 instanceof index_errors_1.ConflictError ||
                                error_4 instanceof index_errors_1.ValidationError ||
                                error_4 instanceof index_errors_1.DomainError) {
                                throw error_4;
                            }
                            throw new index_errors_1.DomainError('Error updating person');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PrismaPersonsRepository_1.prototype.delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var result, deleted, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this._deletePersonSp.execute({
                                    id: id.value,
                                    deletedAt: '',
                                    updatedAt: '',
                                })];
                        case 1:
                            result = _a.sent();
                            deleted = result[0];
                            if (!deleted) {
                                throw new index_errors_1.DomainError('No response from database');
                            }
                            if (deleted.code !== 200) {
                                switch (deleted.code) {
                                    case 404:
                                        throw new index_errors_1.NotFoundError('Person');
                                    default:
                                        throw new index_errors_1.DomainError(deleted.message || 'Error deleting person');
                                }
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_5 = _a.sent();
                            if (error_5 instanceof index_errors_1.NotFoundError || error_5 instanceof index_errors_1.DomainError) {
                                throw error_5;
                            }
                            throw new index_errors_1.DomainError('Error deleting person');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return PrismaPersonsRepository_1;
    }());
    __setFunctionName(_classThis, "PrismaPersonsRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PrismaPersonsRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PrismaPersonsRepository = _classThis;
}();
exports.PrismaPersonsRepository = PrismaPersonsRepository;
