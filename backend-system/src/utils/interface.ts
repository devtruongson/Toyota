export interface IPayloadJWT {
    id: number;
    email: string;
    role: string;
    phone_number: string;
    is_login_social: boolean;
}

export interface IUser {
    id: number;
    role: string;
    address: number;
    address_detail: string;
    phone_number: string;
    code: string;
    email: string;
    password: string;
    avatar: string;
    is_login_social: boolean;
    age: string;
    gender: boolean;
}
