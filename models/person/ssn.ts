import { Sex, SexType } from "@faker-js/faker";

export function SsnGetCenturyCode(birthDate: Date, sex: SexType): number {
    const birthYear = birthDate.getFullYear();
    const maleCode = Math.trunc((birthYear - 1900) / 100);
    if (sex === Sex.Male) {
        return maleCode;
    } else {
        return maleCode + 1;
    }
}
