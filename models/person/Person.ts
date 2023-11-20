import { SexType, faker } from "@faker-js/faker";
import { faker as VNFaker } from "@faker-js/faker/locale/vi";
import { CitiesDetailList } from "../../data/city";
import { SsnGetCenturyCode } from "./ssn";

export interface Person {
    firstname: string;
    lastname: string;
    sex: SexType;
    ssn: string;
    birthPlace: string;
    birthDate: Date;
}

export function CreateRandomPerson(): Person {
    const sex = faker.person.sexType();
    const firstname = VNFaker.person.firstName(sex);
    const lastname = VNFaker.person.lastName();
    const city = faker.helpers.arrayElement(CitiesDetailList);
    const birthPlace = city.center;
    const birthDate = faker.date.past({ refDate: "2010-01-01T00:00:00.000Z" });
    const ssn = `${String(city.ssn).padStart(3, "0")}${SsnGetCenturyCode(
        birthDate,
        sex
    )}${String(birthDate.getFullYear()).padEnd(2)}${faker.string.numeric(6)}`;

    return {
        sex,
        firstname,
        lastname,
        birthDate,
        birthPlace,
        ssn,
    };
}
