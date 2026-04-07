"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./prisma/prisma-persons.repository"), exports);
__exportStar(require("./stored-procedures/create-person.sp"), exports);
__exportStar(require("./stored-procedures/delete -person.sp"), exports);
__exportStar(require("./stored-procedures/get-all-person.sp"), exports);
__exportStar(require("./stored-procedures/get-person-by-id.sp"), exports);
__exportStar(require("./stored-procedures/update-person.sp"), exports);
__exportStar(require("./types/create-person.type"), exports);
__exportStar(require("./types/delete-person.type"), exports);
__exportStar(require("./types/get-all-person.type"), exports);
__exportStar(require("./types/get-person-by-id.type"), exports);
__exportStar(require("./types/person-base.type"), exports);
__exportStar(require("./types/update-person.type"), exports);
