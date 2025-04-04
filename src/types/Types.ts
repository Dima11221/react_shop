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
        { full_background: string }[]
    ,
}

export interface ICartItem {
    id: string;
    name: string;
    finalPrice: number;
}