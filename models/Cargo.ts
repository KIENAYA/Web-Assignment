import { faker } from "@faker-js/faker";
import { Schema, model } from "mongoose";
import { OrderModel } from "./Order";

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
export class CargoModel{
    private static cargoSchema: Schema<Cargo> = new Schema<Cargo>({
        _id: String,
        name: String,
        quantity: Number,
        weight: Number,
    });
    private static _model = model("cargo", this.cargoSchema);
    public static async getAll() {
        return CargoModel._model.find();
    }
    public static async getCargoById(id: String) {
        return await CargoModel._model.findOne({_id: id});
    }
    public static async getCargoFromOrder(id: String) {
        const cargoIdArray = (await OrderModel.getCargoList(id)).cargoList;
        const cargos = new Array();
        for(let i=0; i< cargoIdArray.length; i++) {
            const cargo = await CargoModel.getCargoById(cargoIdArray[i]);
            if(cargo !== null) {
                cargos.push(cargo);
            }
        }
        return cargos;
    }
}
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
