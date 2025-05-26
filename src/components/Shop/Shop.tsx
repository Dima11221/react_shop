import style from './style.module.scss'
import {useEffect} from "react";
import {Preloader} from "../Preloader/Preloader.tsx";
import {GoodsList} from "../GoodsList/GoodsList.tsx";
import {ICartItem} from "../../types/Types.ts";
import {Cart} from "../Cart/Cart.tsx";
import {CartList} from "../CartList/CartList.tsx";
import {Alert} from "../Alert/Alert.tsx";

import {Pages} from "../Pages/Pages.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {handleCartShow, setOrderLocalStorage} from "../../store/reducers/shopSlice.ts";
import {fetchGoods} from "../../store/reducers/thunk.ts";
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


    const CartOrder = order.reduce((acc, item) => acc + item.quantity, 0)


    // const handleCartClose = (e: KeyboardEvent): void => {
    //     if (e.key === 'Escape') {
    //         dispatch(handleCartShow())
    //     }
    // }

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

    // useEffect(function getGoods() {
    //     fetch(API_URL, {
    //         headers: {
    //             'Authorization': API_KEY
    //         },
    //     }).then(response => response.json())
    //       .then((data) => {
    //           dispatch(setGoods(data.shop));
    //       })
    // }, []);

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
        window.addEventListener('keydown', handleCartClose)

        return () => {
            window.removeEventListener('keydown', handleCartClose)
        }
    }, [isCartShow, dispatch])

    return (
      <main className={style.mainWrapper}>
          <Cart quantity={CartOrder}/>
          {loading && (<Preloader />)}

          {!loading && (
            <>
                <GoodsList />
                <Pages />
            </>
          )}
          {
            isCartShow && <CartList/>
          }
          {alertName && <Alert/>}
      </main>
    )
}

export {Shop}