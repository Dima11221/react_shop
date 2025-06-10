import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem, ICheckoutFormItem, IGoodsItemProp} from "../../types/Types.ts";
import {IOrderItem} from "../../components/Pages/Shop/Shop.tsx";
import {fetchGoods, submitOrder} from "./thunk.ts";

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
  }
  formErrors: ICheckoutFormItem;
  checkoutItems: ICartItem[];
}

const initialState : IShopState  = {
  goods: [],
  loading: true,
  order: [],
  isCartShow: false,
  alertName: '',
  currentPage: 1,
  pagesCount: 0,
  itemsPerPage: 10,
  error: null,

  isCheckoutOpen: false,
  customerData: {
    name: '',
    email: '',
    phone: '',
    accName: '',
    paymentMethod: 'empty',
  },
  formErrors: {
    name: '',
    email: '',
    phone: '',
    accName: '',
    paymentMethod: '',
  },
  checkoutItems: [],
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
    // setGoods(state, action: PayloadAction<IGoodsItemProp[]>) {
    //   state.goods = action.payload || [];
    //   state.loading = false;

      // return {
      //   ...state,
      //   goods: action.payload || [],
      //   loading: false,
      // }
    // },
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
    setPagesCount(state, action: PayloadAction<number>) {
      state.pagesCount = action.payload;

        // return {
        //   ...state,
        //   pagesCount: Math.ceil(state.goods.length / state.itemsPerPage),
        // }
      // }
    },

    // openCheckout(state) {
    //   state.isCheckoutOpen = true;
    // },
    //
    // closeCheckout(state) {
    //   state.isCheckoutOpen = false;
    // },

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
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.loading = true;
        state.error =  null;
      })

      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.loading =  false;
        state.goods =  action.payload;
        state.pagesCount = Math.ceil(action.payload.length / state.itemsPerPage);
      })

      .addCase(fetchGoods.rejected, (state, action) => {
        state.loading =  false;
        state.goods = [];
        state.error = action.payload as string;
      })

    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = [];
        state.customerData = initialState.customerData;
        console.log(action.payload);
      })

      .addCase(submitOrder.rejected, (state) => {
        state.loading = false;
      })
  }
});

export const {
  closeAlert,
  addToCart,
  removeFromCart,
  handleCartShow,
  // setGoods,
  incQuantity,
  decQuantity,
  clearCart,
  setOrderLocalStorage,
  setCurrentPage,
  setPagesCount,
  // openCheckout,
  // closeCheckout,
  updateCustomersData,
  resetOrderState,
  setFormErrors,
  clearFormErrors,
} =  shopSlice.actions;

export default shopSlice.reducer;