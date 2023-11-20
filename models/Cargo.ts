import { faker } from "@faker-js/faker";

export type CargoIdType = string;

export enum CargoType {
    Electronic = "Điện thoại, Tivi, Tủ lạnh, Laptop, Máy sấy, Bàn là, Quạt điện, Bàn phím, Tai nghe, Chuột máy tính, Bóng đèn",
    Jewelry = "Vòng tay, Nhẫn, Vòng cổ, Khuyên tai,",
    Houseware = "Bàn dài, Bàn học, Kệ sách, Ghế tựa, Sofa, Chuổi, Hót rác, Ổ điện, Tủ quần áo, Kệ giày dép",
    Cloth = "Giày, Dép , Quần đùi, Quần jean, Quần Kaki, Áo sơ-mi, Áo thun, Áo khoác, Áo len, Tất, Ô, Balo, Túi xách",

}

/**
 * weight (Kg)
 */
export interface Cargo {
    _id: CargoIdType;
    name: string;
    quantity: number;
    weight: number;
}

export function CreateRandomCargo(
    minQuantity: number,
    maxQuantity: number
): Cargo {
    return {
        _id: faker.string.nanoid(),
        name: faker.helpers.enumValue(CargoType),
        quantity: faker.helpers.rangeToNumber({
            min: minQuantity,
            max: maxQuantity,
        }),
        weight: faker.helpers.rangeToNumber(100),
    };
}
