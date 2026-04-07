"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonsMapper = void 0;
var crypto_1 = require("crypto");
var index_domain_1 = require("../../domain/index-domain");
// import { Persons } from '../../domain/entity/persons.entity';
// import { PersonId } from '../../domain/value-objects/personId';
// import { FirstName } from '../../domain/value-objects/firstName';
// import { LastName } from '../../domain/value-objects/lastName';
// import { PhoneNumber } from '../../domain/value-objects/phoneNumber';
// import { Email } from '../../domain/value-objects/email';
// import { CreatePersonInput } from '../../infrastructure/types/create-person.type';
var PersonsMapper = /** @class */ (function () {
    function PersonsMapper() {
    }
    PersonsMapper.toEntity = function (input) {
        var id = new index_domain_1.PersonId((0, crypto_1.randomUUID)());
        var firstName = new index_domain_1.FirstName(input.firstName);
        var lastName = new index_domain_1.LastName(input.lastName);
        var phoneNumber = new index_domain_1.PhoneNumber(input.phoneNumber);
        var email = new index_domain_1.Email(input.email);
        var now = new Date();
        return new index_domain_1.Persons(id, firstName, lastName, phoneNumber, email, now, now, null);
    };
    PersonsMapper.toResponseDto = function (person) {
        return {
            id: person.id.value,
            firstName: person.firstName.value,
            lastName: person.lastName.value,
            phoneNumber: person.phoneNumber.value,
            email: person.email.value,
            createdAt: person.createdAt,
            updatedAt: person.updatedAt,
        };
    };
    return PersonsMapper;
}());
exports.PersonsMapper = PersonsMapper;
