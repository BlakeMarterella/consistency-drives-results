export interface User {
    id: string,
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    emailVerified?: boolean,
    dateCreated?: string,
}