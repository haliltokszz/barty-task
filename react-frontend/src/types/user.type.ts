export interface UserType {
    name?: string,
    surname?: string,
    age?: number,
    bornAt?: Date,
    location?: string,
    about?: string,
    image?: string,
    email?: string,
    balance?: number,
    password?: string
    phoneNumber?: string,
    username?: string
}

export class User implements UserType {}