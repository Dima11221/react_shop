import style from './style.module.scss'
import {useEffect, useContext} from "react";
import {API_KEY, API_URL} from '../../config.ts'
import {Preloader} from "../Preloader/Preloader.tsx";
import {GoodsList} from "../GoodsList/GoodsList.tsx";
import {ICartItem} from "../../types/Types.ts";
import {Cart} from "../Cart/Cart.tsx";
import {CartList} from "../CartList/CartList.tsx";
import {Alert} from "../Alert/Alert.tsx";

import {ShopContext} from "../../context.tsx";

export interface IOrderItem extends ICartItem{
    quantity: number;
}



const Shop = () => {
    const {
        setGoods,
        loading,
        order,
        isCartShow,
        alertName,
        handleCartShow,
        setOrderLocalStorage
    } = useContext(ShopContext);



    const CartOrder = order.reduce((acc, item) => acc + item.quantity, 0)


    const handleCartClose = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
            handleCartShow()
        }
    }

    useEffect(() => {
        const savedOrder = localStorage.getItem("cart");
        // console.log(savedOrder);

        if (savedOrder) {
            try {
                const storage = JSON.parse(savedOrder);
                setOrderLocalStorage(storage);
            }
            catch (e) {
                console.error("Error fetching cart", e);
            }
        }
    }, []);

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY
            },
        }).then(response => response.json())
            .then((data) => {
                setGoods(data.shop);
            })
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(order))
    }, [order])


    useEffect(()=> {
        if (!isCartShow) return;

        window.addEventListener('keydown', handleCartClose)

        return () => {
            window.removeEventListener('keydown', handleCartClose)
        }
    }, [isCartShow])

    return (
        <main className={style.mainWrapper}>
            <Cart quantity={CartOrder}/>
            {loading && (<Preloader />)}

            {!loading && (
                <>
                    <GoodsList/>
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