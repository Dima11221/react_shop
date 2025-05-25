import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem, IGoodsItemProp} from "../../types/Types.ts";
import {IOrderItem} from "../../components/Shop/Shop.tsx";

export interface IShopState {
  goods: IGoodsItemProp[];
  loading: boolean;
  order: IOrderItem[];
  isCartShow: boolean;
  alertName: string;
  pagesCount: number;
  currentPage: number;
  itemsPerPage: number;
}

const initialState : IShopState  = {
  goods: [],
  loading: true,
  order: [],
  isCartShow: false,
  alertName: '',
  currentPage: 1,
  pagesCount: 10,
  itemsPerPage: 10,
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    closeAlert(state) {
      state.alertName = '';
    },
    addToCart(state, action: PayloadAction<ICartItem>) {
      const itemIndex = state.order.findIndex(orderItem => orderItem.id === action.payload.id)

      // if (itemIndex < 0) {
      //   state.order.push({...state, quantity: 1})
      let newOrder = null;
      if (itemIndex < 0) {
        const newItem = {
          ...action.payload,
          quantity: 1,
        }
        newOrder = [...state.order, newItem];
      } else {
        // state.order[itemIndex].quantity += 1;
        newOrder = state.order.map(orderItem => (
          orderItem.id === action.payload.id
            ? {...orderItem, quantity: orderItem.quantity + 1}
            : orderItem
        ));
      }
      // state.alertName = action.payload.name;
      return {
        ...state,
        order: newOrder,
        alertName: action.payload.name,
      };
    },
    removeFromCart(state, action: PayloadAction<{id: string}>) {
      state.order = state.order.filter(el => el.id !== action.payload.id);

      // return {
      //   ...state,
      //   order: state.order.filter(
      //     (el) => {return el.id !== action.payload.id}
      //   )
      // }
    },
    handleCartShow(state){
      state.isCartShow = !state.isCartShow;

      // return {
      //   ...state,
      //   isCartShow: !state.isCartShow,
      // }
    },
    setGoods(state,  action: PayloadAction<IGoodsItemProp[]>) {
      state.goods = action.payload || [];
      state.loading = false;

      // return {
      //   ...state,
      //   goods: action.payload || [],
      //   loading: false,
      // }
    },
    incQuantity(state, action: PayloadAction<{id: string}>) {
      // const item = state.order.find(el => el.id === action.payload.id);
      // if (item) {
      //   item.quantity += 1;
      // }

      state.order = state.order.map((item) => {
        if (item.id ===  action.payload.id) {
          const newQuantity = item.quantity + 1;
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      })
    },
    decQuantity(state, action: PayloadAction<{id: string}>) {
      state.order = state.order.map((item) => {
        if (item.id === action.payload.id) {
          const newQuantity = item.quantity - 1;

          if (newQuantity < 0) {
            return {...item, quantity: newQuantity ? newQuantity : 0}
          }
          return {...item, quantity: newQuantity};
        }
        return item;
      }).filter((item) => item.quantity > 0);

    },
    clearCart(state) {
      state.order = [];
    },
    setOrderLocalStorage(state, action: PayloadAction<IOrderItem[]>) {
      state.order = action.payload;

      // return {
      //   ...state,
      //   order: action.payload,
      // }
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;

      // return {
      //   ...state,
      //   currentPage: action.payload,
      // }
    },
    setPagesCount(state) {
      state.pagesCount = Math.ceil(state.goods.length / state.itemsPerPage);

      //   return {
      //     ...state,
      //     pagesCount: Math.ceil(state.goods.length / state.itemsPerPage),
      //   }
      // }
    }
  },
});

export const {
  closeAlert,
  addToCart,
  removeFromCart,
  handleCartShow,
  setGoods,
  incQuantity,
  decQuantity,
  clearCart,
  setOrderLocalStorage,
  setCurrentPage,
  setPagesCount
} =  shopSlice.actions;

export default shopSlice.reducer;