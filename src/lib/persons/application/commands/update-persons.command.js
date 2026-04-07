"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonsCommand = void 0;
var UpdatePersonsCommand = /** @class */ (function () {
    function UpdatePersonsCommand(id, firstName, lastName, phoneNumber, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    return UpdatePersonsCommand;
}());
exports.UpdatePersonsCommand = UpdatePersonsCommand;
