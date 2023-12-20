"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SsnGetCenturyCode = void 0;
const faker_1 = require("@faker-js/faker");
function SsnGetCenturyCode(birthDate, sex) {
    const birthYear = birthDate.getFullYear();
    const maleCode = Math.trunc((birthYear - 1900) / 100);
    if (sex === faker_1.Sex.Male) {
        return maleCode;
    }
    else {
        return maleCode + 1;
    }
}
exports.SsnGetCenturyCode = SsnGetCenturyCode;
