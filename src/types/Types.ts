export interface IGoodsItemProp {
    id: string
    mainId: string,
    displayName: string,
    displayDescription: string,
    price: {
        regularPrice: number;
        finalPrice: number;
        floorPrice: number;
    },
    displayAssets:
        { background: string }[]
    ,
}

export interface ICartItem {
    id: string;
    name: string;
    finalPrice: number;
}

export interface ICheckoutFormItem {
    name?: string;
    email?: string;
    phone?: string;
    accName?: string;
    paymentMethod?: string;
}

export interface IUser {
    id: string;
    userName: string;
    password: string;
    email: string;
    isAuth: boolean;
    lastLogin: number;
}

export interface IAuthForm {
    email: string;
    password: string;
}

export interface IRegisterUser extends IAuthForm{
    userName: string;
    confirmPassword: string;
}