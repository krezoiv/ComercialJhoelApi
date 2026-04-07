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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonsModule = void 0;
var common_1 = require("@nestjs/common");
var cqrs_1 = require("@nestjs/cqrs");
var prisma_persons_repository_1 = require("./infrastructure/prisma/prisma-persons.repository");
var index_presentation_1 = require("./presentation/index-presentation");
var index_application_1 = require("./application/index-application");
var index_domain_1 = require("./domain/index-domain");
var index_database_1 = require("../../shared/database/index-database");
var index_infrastructure_1 = require("./infrastructure/index-infrastructure");
var CommandHandlers = [
    index_application_1.CreatePersonsHandler,
    index_application_1.UpdatePersonsHandler,
    index_application_1.SoftDeletePersonsHandler,
];
var QueryHandlers = [index_application_1.GetAllPersonsHandler, index_application_1.GetPersonByIdHandler];
var PersonsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [cqrs_1.CqrsModule],
            controllers: [index_presentation_1.PersonsController],
            providers: __spreadArray(__spreadArray(__spreadArray([
                index_database_1.PrismaService,
                // 🔥 SP infrastructure
                index_database_1.SpExecutorService,
                index_infrastructure_1.CreatePersonSp,
                index_infrastructure_1.UpdatePersonSp,
                index_infrastructure_1.GetAllPersonSp,
                index_infrastructure_1.GetPersonByIdSp,
                index_infrastructure_1.DeletePesonSp
            ], CommandHandlers, true), QueryHandlers, true), [
                {
                    provide: index_domain_1.PERSONS_REPOSITORY,
                    useClass: prisma_persons_repository_1.PrismaPersonsRepository,
                },
            ], false),
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PersonsModule = _classThis = /** @class */ (function () {
        function PersonsModule_1() {
        }
        return PersonsModule_1;
    }());
    __setFunctionName(_classThis, "PersonsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PersonsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PersonsModule = _classThis;
}();
exports.PersonsModule = PersonsModule;
