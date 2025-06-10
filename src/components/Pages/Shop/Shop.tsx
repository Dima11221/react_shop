import {useEffect, useState} from "react";
import {Preloader} from "../../Preloader/Preloader.tsx";
import {GoodsList} from "../../GoodsList/GoodsList.tsx";
import {ICartItem, IGoodsItemProp} from "../../../types/Types.ts";
import {Cart} from "../../Cart/Cart.tsx";
import {CartList} from "../../CartList/CartList.tsx";
import {Alert} from "../../Alert/Alert.tsx";

import {Pages} from "../../Pagination/Pages.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store.ts";
import {
    handleCartShow,
    setCurrentPage,
    setOrderLocalStorage,
    setPagesCount
} from "../../../store/reducers/shopSlice.ts";
import {fetchGoods} from "../../../store/reducers/thunk.ts";
import {CheckoutForm} from "../CheckoutForm/CheckoutForm.tsx";
import {Search} from "../../Search/Search.tsx";
import {PriceFilter} from "../../PriceFilter/PriceFilter.tsx";
// import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";

export interface IOrderItem extends ICartItem{
    quantity: number;
}


const Shop = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading =  useSelector((state: RootState) => state.shop.loading);
    const order =  useSelector((state: RootState) => state.shop.order);
    const isCartShow = useSelector((state: RootState) => state.shop.isCartShow);
    const alertName = useSelector((state: RootState) => state.shop.alertName);
    const goods = useSelector((state: RootState) => state.shop.goods);
    // console.log(goods, 'goods')
    const CartOrder = order.reduce((acc, item) => acc + item.quantity, 0)
    const itemsPerPage = useSelector((state: RootState) => state.shop.itemsPerPage);

    const [filteredGoods, setFilteredGoods] = useState<IGoodsItemProp[]>(goods);
    const [priceFilter, setPriceFilter] = useState({min: 0, max: 0});

    const filters = (searchStr: string = '', priceRange: {min: number, max: number}) => {
        let result = goods;
        // console.log(goods);

        if (searchStr) {
            result = result.filter(good =>
              good.displayName.toLowerCase().includes(searchStr.toLowerCase())
            );

        }

        if (priceRange.min > 0 || priceRange.max > 0) {
            result = result.filter(good => {
                const price = good.price.finalPrice;
                return (
                  (priceRange.min === 0 || priceRange.min <= price) &&
                  (priceRange.max === 0 || priceRange.max >= price)
                )
            });
        }

        setFilteredGoods(result);
        dispatch(setPagesCount(Math.ceil(result.length / itemsPerPage)));
    }

    useEffect(() => {
        setPriceFilter({min: 0, max: 0});
        setFilteredGoods(goods);
        dispatch(setPagesCount(Math.ceil(goods.length/itemsPerPage)));
        // console.log(goods);
    }, [goods, dispatch, setPagesCount]);

    const handleSearch = (str: string) => {
        // console.log(str);
        dispatch(setCurrentPage(1));
        filters(str, priceFilter)

        // const filtered = goods.filter(good =>
        //   good.displayName.toLowerCase().includes(str.toLowerCase())
        // );
        // setFilteredGoods(filtered);
        // const currentPagesCount = Math.ceil(filtered.length / itemsPerPage);
        //
        // dispatch(setPagesCount(currentPagesCount));
        // console.log(filtered)
        // console.log(currentPagesCount)
    }

    const handlePriceFilter = (min: number, max: number) => {
        setPriceFilter({min, max});
        dispatch(setCurrentPage(1));
        filters('', {min, max});
    }

    useEffect(() => {
        const savedOrder = localStorage.getItem("cart");
        // console.log(savedOrder);

        if (savedOrder) {
            try {
                const storage = JSON.parse(savedOrder);
                dispatch(setOrderLocalStorage(storage));
            }
            catch (e) {
                console.error("Error fetching cart", e);
            }
        }
    }, [dispatch]);

    const isCheckoutOpen = useSelector((state: RootState) => state.shop.isCheckoutOpen)


    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(order))
    }, [order])


    useEffect(()=> {
        if (!isCartShow) return;

        const handleCartClose = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') {
                dispatch(handleCartShow())
            }
        }

        if (isCartShow || isCheckoutOpen) {
            window.addEventListener('keydown', handleCartClose)
        }

        return () => {
            window.removeEventListener('keydown', handleCartClose)
        }
    }, [isCheckoutOpen, isCartShow, dispatch])

    return (
      <div>
          <Search handleSearch={handleSearch} />
          <PriceFilter
            handlePriceFilter={handlePriceFilter}
            currentMinPrice={priceFilter.min}
            currentMaxPrice={priceFilter.max}
          />
          <Cart quantity={CartOrder}/>
          {loading && (<Preloader />)}

          {!loading && (
            <>
                <GoodsList filteredGoods={filteredGoods}/>
                <Pages />
            </>
          )}
          {
            isCartShow && <CartList/>
          }
          {alertName && <Alert/>}
          {isCheckoutOpen && <CheckoutForm />}
      </div>
    )
}

export {Shop}