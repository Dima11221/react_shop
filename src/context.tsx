import {createContext, ReactNode, useReducer} from "react";
import {IShopState, reducer} from "./reducer.ts";
import {ICartItem, IGoodsItemProp} from "./types/Types.ts";
import {IOrderItem} from "./components/Shop/Shop.tsx";

interface IContextProviderProp {
    children: ReactNode;
}

interface IShopContextType extends IShopState{
    closeAlert: () => void;
    addToCart: (item: ICartItem) => void;
    removeFromCart: (id: string) => void;
    incQuantity: (id: string) => void;
    decQuantity: (id: string) => void;
    clearCart: () => void;
    handleCartShow: () => void;
    setGoods: (goods: IGoodsItemProp[]) => void;
    setOrderLocalStorage: (order: IOrderItem[]) => void;
}

const initialState : IShopState  = {
    goods: [],
    loading: true,
    order: [],
    isCartShow: false,
    alertName: '',
}


export const ShopContext = createContext({} as IShopContextType);

export const ContextProvider = ({ children }: IContextProviderProp) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue : IShopContextType = {
        ...state,

        closeAlert: () => {
            dispatch({type: 'CLOSE_ALERT'})
        },

        addToCart: (item) => {
            dispatch({type: 'ADD_TO_CART', payload: item})
        },

        removeFromCart: (itemID) => {
            dispatch({type: 'REMOVE_FROM_CART', payload: {id: itemID}})
        },

        incQuantity: (itemID) => {
            dispatch({type: 'INC_QUANTITY', payload: {id: itemID}})
        },

        decQuantity: (itemID) => {
            dispatch({type: 'DEC_QUANTITY', payload: {id: itemID}})
        },

        clearCart: () => {
            dispatch({type: 'CLEAR_CART'})
        },

        handleCartShow: () => {
            dispatch({type: 'TOGGLE_CART_SHOW'})
        },

        setGoods: (data) => {
            dispatch({type: 'SET_GOODS', payload: data})
        },

        setOrderLocalStorage: (order) => {
            dispatch({type: 'SET_ORDER_LOCAL_STORAGE', payload: order})
        }

    };

    // value.closeAlert = () => {
    //     dispatch({type: 'CLOSE_ALERT'})
    // }
    // value.addToCart = (item) => {
    //     dispatch({type: 'ADD_TO_CART', payload: item})
    // }
    // value.removeFromCart = (itemID) => {
    //     dispatch({type: 'REMOVE_FROM_CART', payload: {id: itemID}});
    // }
    // value.incQuantity = (itemID) => {
    //     dispatch({type: 'INC_QUANTITY', payload: {id: itemID}})
    // }
    // value.decQuantity = (itemID) => {
    //     dispatch({type: 'DEC_QUANTITY', payload: {id: itemID}})
    // }
    // value.clearCart = () => {
    //     dispatch({type: 'CLEAR_CART'})
    // }
    // value.handleCartShow = () => {
    //     dispatch({type: 'TOGGLE_CART_SHOW'})
    // }
    // value.setGoods = (data) => {
    //     dispatch({type: 'SET_GOODS', payload: data})
    // }


    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
};