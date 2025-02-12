export interface IAuth {
    IsLoginIn: boolean;
    user: IUser | null;
    tokens: {
        access_token: string;
        refresh_token: string;
    } | null;
}

export type TRole = 'user' | 'admin';

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    role?: TRole;
    address?: number | null;
    address_detail?: string | null;
    phone_number?: string | null;
    code?: string | null;
    email?: string | null;
    password?: string | null;
    avatar?: string | null;
    is_login_social?: boolean | null;
    age?: string | null;
    gender?: boolean | null;
    createdAt: string;
    updatedAt: string;
    order_list?: IOrder[];
}

export interface ILoginForm {
    username: string;
    password: string;
}

export interface IRegister {
    first_name: string;
    last_name: string;
    address_detail: string;
    phone_number: string;
    code: string;
    email: string;
    password: string;
}

export interface IRes<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IPagin<T> {
    items: T[];
    meta: IMeta;
}

export interface IMeta {
    currentPage: number;
    totalIteams: number;
    totalPages: number;
}

export interface ITokens {
    access_token: string;
    refresh_token: string;
}

export interface IOrder {
    id: number;
    user_id: number;
    car_id: number;
    order_date: string;
    title: string;
    meta_sub_title: string;
    is_show_form: string;
    description: string;
    weight: number;
    model: string;
    battery_capacity: string;
    range_km: string;
    price_no_battery: string;
    price_has_battery: string;
    display: string;
    conditioning: string;
    sound: string;
    usb: string;
    bluetooth: string;
    sun_visor: string;
    lights: string;
    brake: string;
    brake_abs: string;
    ebd: string;
    esc: string;
    tcs: string;
    hsa: string;
    rom: string;
    air_bag: string;
    key_code: string;
    note: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICarFeature {
    id: number;
    image_url: string;
    color: string;
    is_active: boolean;
    car_id: number;
    createdAt: string;
    updatedAt: string;
}

export interface ICar {
    id: number;
    title: string;
    meta_sub_title: string;
    is_show_form: boolean;
    description: string;
    weight: number;
    model: string;
    battery_capacity: string;
    range_km: string;
    price_no_battery: string;
    price_has_battery: string;
    status: string;
    display: string;
    conditioning: string;
    sound: string;
    usb: string;
    bluetooth: string;
    sun_visor: string;
    lights: string;
    brake: string;
    brake_abs: string;
    ebd: string;
    esc: string;
    tcs: string;
    hsa: string;
    rom: string;
    air_bag: string;
    key_code: string;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    car_features: ICarFeature[];
}

export interface IUpload {
    name_file: string;
    url_public: string;
}
