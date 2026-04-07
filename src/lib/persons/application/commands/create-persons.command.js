"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonsCommand = void 0;
var CreatePersonsCommand = /** @class */ (function () {
    function CreatePersonsCommand(firstName, lastName, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    return CreatePersonsCommand;
}());
exports.CreatePersonsCommand = CreatePersonsCommand;
