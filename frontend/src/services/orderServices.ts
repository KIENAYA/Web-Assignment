



import  { CargoHandlePointModel } from '../../../Backend/models/CargoHandlePoint'
const token=localStorage.getItem("user")
const tokenObject=JSON.parse(token?token:"")
const idPointAdmin=tokenObject.id
export async function getID() {
    const response= await CargoHandlePointModel.getPointIdFromAdmin("idPointAdmin")
    console.log(response)
    console.log("ajfd")
}



