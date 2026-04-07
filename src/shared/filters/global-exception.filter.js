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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var validation_error_1 = require("../errors/validation-error");
var not_found_error_1 = require("../errors/not-found-error");
var domain_error_1 = require("../errors/domain-error");
var conflict_error_1 = require("../errors/conflict-error");
var GlobalExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var GlobalExceptionFilter = _classThis = /** @class */ (function () {
        function GlobalExceptionFilter_1() {
        }
        GlobalExceptionFilter_1.prototype.catch = function (exception, host) {
            var ctx = host.switchToHttp();
            var response = ctx.getResponse();
            if (exception instanceof common_2.BadRequestException) {
                var responseBody = exception.getResponse();
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: 400,
                    message: Array.isArray(responseBody.message)
                        ? responseBody.message[0]
                        : responseBody.message,
                });
            }
            if (exception instanceof validation_error_1.ValidationError) {
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: 400,
                    message: exception.message,
                });
            }
            if (exception instanceof conflict_error_1.ConflictError) {
                return response.status(common_1.HttpStatus.CONFLICT).json({
                    statusCode: 409,
                    message: exception.message,
                });
            }
            if (exception instanceof not_found_error_1.NotFoundError) {
                return response.status(common_1.HttpStatus.NOT_FOUND).json({
                    statusCode: 404,
                    message: exception.message,
                });
            }
            if (exception instanceof domain_error_1.DomainError) {
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: 400,
                    message: exception.message,
                });
            }
            console.error(exception);
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: 500,
                message: 'Internal server error',
            });
        };
        return GlobalExceptionFilter_1;
    }());
    __setFunctionName(_classThis, "GlobalExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GlobalExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GlobalExceptionFilter = _classThis;
}();
exports.GlobalExceptionFilter = GlobalExceptionFilter;
