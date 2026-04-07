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
exports.CustomersModule = void 0;
var cqrs_1 = require("@nestjs/cqrs");
var index_application_1 = require("./application/index-application");
var index_database_1 = require("../../shared/database/index-database");
var index_infrastructure_1 = require("./infrastructure/index-infrastructure");
var index_domain_1 = require("./domain/index-domain");
var prisma_customers_repository_1 = require("./infrastructure/prisma/prisma-customers-repository");
var common_1 = require("@nestjs/common");
var index_presentation_1 = require("./presentation/index-presentation");
var CommandHandlers = [index_application_1.CreateCustomersHandler];
var QueryHandlers = [index_application_1.GetAllCustomersHandler];
var CustomersModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [cqrs_1.CqrsModule],
            controllers: [index_presentation_1.CustomerController],
            providers: __spreadArray(__spreadArray(__spreadArray([
                index_database_1.PrismaService,
                index_database_1.SpExecutorService,
                index_infrastructure_1.CreateCustomersSp,
                index_infrastructure_1.GetAllCustomersSp
            ], CommandHandlers, true), QueryHandlers, true), [
                {
                    provide: index_domain_1.CUSTOMERS_REPOSITORY,
                    useClass: prisma_customers_repository_1.PrismaCustomersRepository,
                },
            ], false),
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CustomersModule = _classThis = /** @class */ (function () {
        function CustomersModule_1() {
        }
        return CustomersModule_1;
    }());
    __setFunctionName(_classThis, "CustomersModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomersModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomersModule = _classThis;
}();
exports.CustomersModule = CustomersModule;
