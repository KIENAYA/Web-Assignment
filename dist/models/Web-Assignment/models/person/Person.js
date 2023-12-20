"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRandomPerson = void 0;
const faker_1 = require("@faker-js/faker");
const vi_1 = require("@faker-js/faker/locale/vi");
const city_1 = require("../../data/city");
const ssn_1 = require("./ssn");
function CreateRandomPerson() {
    const sex = faker_1.faker.person.sexType();
    const firstname = vi_1.faker.person.firstName(sex);
    const lastname = vi_1.faker.person.lastName();
    const city = faker_1.faker.helpers.arrayElement(city_1.CitiesDetailList);
    const birthPlace = city.center;
    const birthDate = faker_1.faker.date.past({ refDate: "2010-01-01T00:00:00.000Z" });
    const ssn = `${String(city.ssn).padStart(3, "0")}${(0, ssn_1.SsnGetCenturyCode)(birthDate, sex)}${String(birthDate.getFullYear()).padEnd(2)}${faker_1.faker.string.numeric(6)}`;
    return {
        sex,
        firstname,
        lastname,
        birthDate,
        birthPlace,
        ssn,
    };
}
exports.CreateRandomPerson = CreateRandomPerson;
