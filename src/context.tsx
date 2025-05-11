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
    setCurrentPage: (page: number) => void;
    setPagesCount: () => void;
    getCurrentPageGoods: () => IGoodsItemProp[];
    handlePrevPage: () => void;
    handleNextPage: () => void;
}

const initialState : IShopState  = {
    goods: [],
    loading: true,
    order: [],
    isCartShow: false,
    alertName: '',
    currentPage: 1,
    pagesCount: 1,
    itemsPerPage: 10,
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

        setOrderLocalStorage: (order) => {
            dispatch({type: 'SET_ORDER_LOCAL_STORAGE', payload: order})
        },

        setCurrentPage: (page) => {
            dispatch({type: "SET_CURRENT_PAGE", payload: page})
        },

        setPagesCount: () => {
            dispatch({type: "SET_PAGES_COUNT"})
        },

        setGoods: (data) => {
            dispatch({type: 'SET_GOODS', payload: data})
            dispatch({type: "SET_PAGES_COUNT"})
        },

        getCurrentPageGoods: () => {
            const startIndexInPage = (state.currentPage - 1) * state.itemsPerPage;
            const endIndexInPage = state.currentPage * state.itemsPerPage;
            return state.goods.slice(startIndexInPage, endIndexInPage);
        },

        handlePrevPage: () => {
            if (state.currentPage > 1) {
                dispatch({type: "SET_CURRENT_PAGE", payload: state.currentPage - 1})
            }
        },

        handleNextPage: () => {
            if (state.currentPage < state.pagesCount) {
                dispatch({type: "SET_CURRENT_PAGE", payload: state.currentPage + 1})
            }
        },
    };


    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
};