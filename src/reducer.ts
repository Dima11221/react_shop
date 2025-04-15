import {IOrderItem} from "./components/Shop/Shop.tsx";
import {ICartItem, IGoodsItemProp} from "./types/Types.ts";

export interface IShopState {
    goods: IGoodsItemProp[];
    loading: boolean;
    order: IOrderItem[];
    isCartShow: boolean;
    alertName: string;
}

type Action =
  | {type: 'CLOSE_ALERT'}
  | {type: 'ADD_TO_CART'; payload: ICartItem}
  | {type: 'REMOVE_FROM_CART'; payload: {id: string}}
  | {type: 'INC_QUANTITY'; payload: {id: string}}
  | {type: 'DEC_QUANTITY'; payload: {id: string}}
  | {type: 'CLEAR_CART'}
  | {type: 'TOGGLE_CART_SHOW'}
  | {type: 'SET_GOODS'; payload: IGoodsItemProp[]}
  | {type: 'SET_ORDER_LOCAL_STORAGE'; payload: IOrderItem[]}

export const reducer = (state: IShopState, action: Action) => {
    switch (action.type) {

        case 'SET_GOODS':
            return {
                ...state,
                goods: action.payload || [],
                loading: false,
            }

        case 'CLEAR_CART':
            return {
                ...state,
                order: []
            }

        case 'ADD_TO_CART':
            // console.log('ADD_TO_CART', action.payload);
            const itemIndex = state.order.findIndex(orderItem => orderItem.id === action.payload.id)

            let newOrder = null;
            if (itemIndex < 0) {
                const newItem = {
                    ...action.payload,
                    quantity: 1,
                }
                newOrder = [...state.order, newItem];
            } else {
                newOrder = state.order.map(orderItem => (
                    orderItem.id === action.payload.id
                        ? {...orderItem, quantity: orderItem.quantity + 1}
                        : orderItem
                ));
            }
            return {
                ...state,
                order: newOrder,
                alertName: action.payload.name,
            };

        case 'INC_QUANTITY':
            return {
                ...state,
                order: state.order.map((el) => {
                    if (el.id === action.payload.id) {
                        const newQuantity = el.quantity + 1;
                        return {...el, quantity: newQuantity}
                    } else {
                        return el;
                    }
                })
            }

        case 'DEC_QUANTITY':
            return {
                ...state,
                order: state.order.map((el) => {
                    if (el.id === action.payload.id) {
                        const newQuantity = el.quantity - 1;
                        return {...el, quantity: newQuantity >= 0 ? newQuantity : 0}
                    } else {
                        return el;
                    }
                }).filter((el) => el.quantity > 0)
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                order: state.order.filter(
                    (el) => {return el.id !== action.payload.id}
                )
            }

        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: ''
            }

        case 'TOGGLE_CART_SHOW':
            return {
                ...state,
                isCartShow: !state.isCartShow,
            }

        case 'SET_ORDER_LOCAL_STORAGE':
            return {
                ...state,
                order: action.payload,
            }
        default:
            return state;
    }
}