export interface ICargo{
    id: string;
    description: string;
    quantity: number;
    weight:number;
}

export const fakeItem: ICargo[]=[
{
    id:"202492",
    description: "3idd",
    quantity:1,
    weight:3
}
];
export enum PageEnum{
    list,
    add,
    edit
}