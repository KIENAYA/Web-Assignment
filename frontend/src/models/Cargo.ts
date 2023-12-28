import { faker } from "@faker-js/faker";
import { Schema, model } from "mongoose";
import { OrderModel } from "./Order";

export type CargoIdType = string;

export enum CargoType {
   túi = "túi sách", váy = "váy", áo1 = "áo len", áo2 = "áo sơ-mi", áo3 = "áo thun", quần1 ="quần đùi",
   quần2 = "quần thể thao", phone1 = "điện thoại samsung", phone2 = "điện thoài iphone", laptop1= "laptop acer", laptop2 ="laptop dell", bàn = "bàn học", bàn2 =" bàn gỗ", kệ = "kệ gỗ", ghế1 = "ghế gaming",ghế2 = "ghế gập", ghế3 = "ghế gỗ", tủ = "tủ quần áo", vòng = "vòng tay", nhẫn ="nhẫn",
   keyboard = " bàn phím", mouse =" chuột không dây", đèn1 = "đèn học",đèn2 = "đèn led", quạt = "quạt điện", turlanh = "tủ lạnh", đh = "điều hòa",tv ="ti vi", ấm = "ấm điện", dép ="dép", mg ="máy giặt"
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
        const cargoIdArray = (await OrderModel.getCargoList(id));
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
        weight: faker.helpers.rangeToNumber({
            min: 1,
            max: 10,
        }),
    };
}
