"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRandomCargo = exports.CargoType = void 0;
const faker_1 = require("@faker-js/faker");
var CargoType;
(function (CargoType) {
    CargoType["Electronic"] = "\u0110i\u1EC7n tho\u1EA1i, Tivi, T\u1EE7 l\u1EA1nh, Laptop, M\u00E1y s\u1EA5y, B\u00E0n l\u00E0, Qu\u1EA1t \u0111i\u1EC7n, B\u00E0n ph\u00EDm, Tai nghe, Chu\u1ED9t m\u00E1y t\u00EDnh, B\u00F3ng \u0111\u00E8n";
    CargoType["Jewelry"] = "V\u00F2ng tay, Nh\u1EABn, V\u00F2ng c\u1ED5, Khuy\u00EAn tai,";
    CargoType["Houseware"] = "B\u00E0n d\u00E0i, B\u00E0n h\u1ECDc, K\u1EC7 s\u00E1ch, Gh\u1EBF t\u1EF1a, Sofa, Chu\u1ED5i, H\u00F3t r\u00E1c, \u1ED4 \u0111i\u1EC7n, T\u1EE7 qu\u1EA7n \u00E1o, K\u1EC7 gi\u00E0y d\u00E9p";
    CargoType["Cloth"] = "Gi\u00E0y, D\u00E9p , Qu\u1EA7n \u0111\u00F9i, Qu\u1EA7n jean, Qu\u1EA7n Kaki, \u00C1o s\u01A1-mi, \u00C1o thun, \u00C1o kho\u00E1c, \u00C1o len, T\u1EA5t, \u00D4, Balo, T\u00FAi x\u00E1ch";
})(CargoType || (exports.CargoType = CargoType = {}));
function CreateRandomCargo(minQuantity, maxQuantity) {
    return {
        _id: faker_1.faker.string.nanoid(),
        name: faker_1.faker.helpers.enumValue(CargoType),
        quantity: faker_1.faker.helpers.rangeToNumber({
            min: minQuantity,
            max: maxQuantity,
        }),
        weight: faker_1.faker.helpers.rangeToNumber(100),
    };
}
exports.CreateRandomCargo = CreateRandomCargo;
