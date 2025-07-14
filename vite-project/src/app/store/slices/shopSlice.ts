import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem, ICheckoutFormItem, IGoodsItemProp} from "../../../shared/types/Types.ts";
import {IOrderItem} from "../../../pages/Shop/Shop.tsx";
import {setupGoodsListener, submitOrder} from "./thunk.ts";

export interface IShopState {
  goods: IGoodsItemProp[];
  loading: boolean;
  order: IOrderItem[];
  isCartShow: boolean;
  alertName: string;
  pagesCount: number;
  currentPage: number;
  itemsPerPage: number;
  error: null | string;

  isCheckoutOpen: boolean;
  customerData: {
    name: string;
    email: string;
    phone: string;
    accName: string;
    paymentMethod: 'empty' | 'sbp' | 'card' | 'crypto';
    paymentInput: string;
  }
  formErrors: ICheckoutFormItem;
  checkoutItems: ICartItem[];
  checkoutStatus: 'idle' | 'loading' | 'success' | 'fail';
  checkoutError: string | null;
}

const initialState : IShopState  = {
  goods: [],
  loading: true,
  order: [],
  isCartShow: false,
  alertName: '',
  currentPage: 1,
  pagesCount: 0,
  itemsPerPage: 12,
  error: null,

  isCheckoutOpen: false,
  customerData: {
    name: '',
    email: '',
    phone: '',
    accName: '',
    paymentMethod: 'empty',
    paymentInput: '',
  },
  formErrors: {
    name: '',
    email: '',
    phone: '',
    accName: '',
    paymentMethod: '',
    paymentInput: '',
  },
  checkoutItems: [],
  checkoutStatus: 'idle',
  checkoutError: null,
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    closeAlert(state) {
      state.alertName = '';
    },
    addToCart(state, action: PayloadAction<ICartItem>) {

      const itemIndex = state.order.findIndex((item) => item.id === action.payload.id);
      let newOrder = null;
      if (itemIndex < 0) {
        const newItem = {
          ...action.payload,
          quantity: 1,
        }
        newOrder = [...state.order, newItem];
      } else {
        newOrder = state.order.map((item) => item.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item);
      }
      return {
        ...state,
        order: newOrder,
        alertName: action.payload.name,
      }
    },
    removeFromCart(state, action: PayloadAction<{id: string}>) {
      state.order = state.order.filter(el => el.id !== action.payload.id);

    },
    handleCartShow(state){
      state.isCartShow = !state.isCartShow;

    },
    incQuantity(state, action: PayloadAction<{id: string}>) {

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

    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;

    },
    setPagesCount(state, action: PayloadAction<number>) {
      state.pagesCount = action.payload;

    },

    updateCustomersData(state, action: PayloadAction<IShopState['customerData']>) {
      state.customerData = {...state.customerData, ...action.payload};
    },

    resetOrderState(state) {
      state.order = [];
      state.customerData = initialState.customerData;
    },

    setFormErrors(state, action: PayloadAction<IShopState['formErrors']>) {
      state.formErrors = action.payload;
    },

    clearFormErrors(state) {
      state.formErrors = {};
    },

    resetCheckoutStatus(state) {
      state.checkoutStatus = 'idle';
      state.checkoutError = null;
    },
    // setGoods(state, action: PayloadAction<IGoodsItemProp[]>) {
    //   state.goods = action.payload;
    //   state.pagesCount = Math.ceil(action.payload.length / state.itemsPerPage);
    // }
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchGoods.pending, (state) => {
    //     state.loading = true;
    //     state.error =  null;
    //   })
    //
    //   .addCase(fetchGoods.fulfilled, (state, action) => {
    //     state.loading =  false;
    //     state.goods =  action.payload;
    //     state.pagesCount = Math.ceil(action.payload.length / state.itemsPerPage);
    //   })
    //
    //   .addCase(fetchGoods.rejected, (state, action) => {
    //     state.loading =  false;
    //     state.goods = [];
    //     state.error = action.payload as string;
    //   })

    builder
      .addCase(submitOrder.pending, (state) => {
        state.checkoutStatus = 'loading';
        state.checkoutError = null;
      })

      .addCase(submitOrder.fulfilled, (state, action) => {
        state.checkoutStatus = 'success';
        state.order = [];
        state.customerData = initialState.customerData;
        console.log(action.payload);
      })

      .addCase(submitOrder.rejected, (state, action) => {
        state.checkoutStatus = 'fail';
        state.checkoutError = (action.payload as {message?: string})?.message || 'Ошибка оформления заказа';
      })

    builder
      .addCase(setupGoodsListener.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setupGoodsListener.fulfilled, (state, action) => {
        state.loading = false;
        state.goods = action.payload;
        state.pagesCount = Math.ceil(action.payload.length / state.itemsPerPage);
      })
      .addCase(setupGoodsListener.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error('WebSocket error:', action.payload);
      })
  }
});

export const {
  closeAlert,
  addToCart,
  removeFromCart,
  handleCartShow,
  incQuantity,
  decQuantity,
  clearCart,
  setOrderLocalStorage,
  setCurrentPage,
  setPagesCount,
  updateCustomersData,
  resetOrderState,
  setFormErrors,
  clearFormErrors,
  resetCheckoutStatus,
  // setGoods
} =  shopSlice.actions;

export default shopSlice.reducer;