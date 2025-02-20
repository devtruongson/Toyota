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
    first_name: string;
    last_name: string;
}

export interface ICar {
    id: number;
    title: string;
    description: string;
    weight: number;
    model: string;
    battery_capacity: string;
    range_km?: string;
    price?: string;
    status?: string;
}

export interface IQueryForm {
    status?: 'pending' | 'approved';
    q?: string;
    sort?: any;
    type: 'BOOK_DEMO' | 'TEST_DRIVE';
}
