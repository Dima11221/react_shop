import style from './style.module.scss'
import {useState, useEffect} from "react";
import {API_KEY, API_URL} from '../../config.ts'
import {Preloader} from "../Preloader/Preloader.tsx";
import {GoodsList} from "../GoodsList/GoodsList.tsx";
import {ICartItem, IGoodsItemProp} from "../../types/Types.ts";
import {Cart} from "../Cart/Cart.tsx";
import {CartList} from "../CartList/CartList.tsx";
import {Alert} from "../Alert/Alert.tsx";
import {Pages} from "../Pages/Pages.tsx";

export interface IOrderItem extends ICartItem{
    quantity: number;
}

export interface IDItemProp {
    id: string;
}

const get = () => {
    const storage = localStorage.getItem("cart");
    return storage ? JSON.parse(storage) : [];
}

const Shop = () => {

    const [goods, setGoods] = useState<IGoodsItemProp[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [order, setOrder] = useState<IOrderItem[]>(get)
    const [isCartShow, setCartShow] = useState<boolean>(false)
    const [alertName, setAlertName] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    // console.log(order)

    const itemsPerPage = 10;
    const startIndexInPage = (currentPage - 1) * itemsPerPage;
    const endIndexInPage = currentPage * itemsPerPage;
    // console.log(startIndexInPage, endIndexInPage);
    const currentItemsInPage = goods.slice(startIndexInPage, endIndexInPage);
    // console.log(currentItemsInPage);
    const pagesCount = Math.ceil(goods.length / itemsPerPage);
    // console.log(pagesCount);

    const addToCart = (item: ICartItem): void => {
        setOrder((prevOrder) => {
            const itemIndex = prevOrder.findIndex(orderItem => orderItem.id === item.id)
            // console.log(itemIndex)
            if (itemIndex < 0) {
                const newItem: IOrderItem = {
                    ...item,
                    quantity: 1,
                }
               return [...prevOrder, newItem];
            } else {
                const newOrder = prevOrder.map(orderItem => (
                    orderItem.id === item.id
                    ? {...orderItem, quantity: orderItem.quantity + 1}
                    : orderItem
                ));
                return newOrder;
            }
        })

        setAlertName(item.name)
        // const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)
        // if (itemIndex < 0) {
        //     const newItem: IOrderItem = {
        //         ...item,
        //         quantity: 1,
        //     }
        //     setOrder([...order, newItem])
        // } else {
        //     const newOrder = order.map((orderItem, index) => {
        //         if (index === itemIndex) {
        //             return {
        //                 ...orderItem,
        //                 quantity: orderItem.quantity + 1,
        //             }
        //
        //         } else {
        //             return orderItem;
        //         }
        //     })
        //
        //     setOrder(newOrder)
        // }
    };

    const removeFromCart = (itemID: IDItemProp): void => {
        const newOrder = order.filter((el) => {
                // console.log(itemID)
                return el.id !== itemID.id
            }
        );
        setOrder(newOrder);

    }

    const incQuantity = (itemID: IDItemProp) => {
        const newOrder = order.map((el) => {
            if (el.id === itemID.id) {
                const newQuantity = el.quantity + 1;
                return {...el, quantity: newQuantity}
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    const decQuantity = (itemID: IDItemProp) => {
        const newOrder = order.map((el) => {
            if (el.id === itemID.id) {
                const newQuantity = el.quantity - 1;
                return {...el, quantity: newQuantity >= 0 ? newQuantity : 0}
            } else {
                return el;
            }
        }).filter((el) => el.quantity > 0);

        setOrder(newOrder);
    };

    const clearCart = () => {
        setOrder([]);
    }

    const CartOrder = order.reduce((acc, item) => acc + item.quantity, 0)


    const handleCartShow = (): void => {
        setCartShow(!isCartShow)
    }

    const handleCartClose = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
            setCartShow(!isCartShow)
        }
    }

    const closeAlert = () => {
        setAlertName('')
    }

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY
            },
        }).then(response => response.json())
            .then((data) => {
                // console.log(data)
                data.shop && setGoods(data.shop);
                setLoading(false);
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
            <Cart quantity={CartOrder} handleCartShow={handleCartShow}/>
            {loading && (<Preloader />)}

            {!loading && (
                <>
                    <GoodsList goods={currentItemsInPage} addToCart={addToCart}/>

                    <Pages pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
            )}
            {
                isCartShow && <CartList
                    order={order}
                    handleCartShow={handleCartShow}
                    removeFromCart={removeFromCart}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                    clearCart={clearCart}
                />
            }
            {alertName && <Alert name={alertName} closeAlert={closeAlert}/>}
        </main>
    )
}

export {Shop}