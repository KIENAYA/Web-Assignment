export type EmployeeProfile={
    firstname:string,
    lastname: string,
    sex:string,
    birthDate:string,
    birthPlace:string,
    ssn:string
}
export type EmployeeLogIn={
profile:EmployeeProfile,
    id:string,
username:string,
password:string,
role:string
}
export const employeeLogins: EmployeeLogIn[]=[]