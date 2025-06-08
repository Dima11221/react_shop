import {CartItem} from "../CartItem/CartItem.tsx";
import style from './style.module.scss'
import closeModalIcon from '../../icons/closeModalIcon.svg'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {clearCart, handleCartShow} from "../../store/reducers/shopSlice.ts";
import {Link} from "react-router-dom";



const CartList = () => {
    const dispatch = useDispatch();
    const order =  useSelector((state: RootState) => state.shop.order);
    // const quantity = useSelector((state: RootState) => state.shop.quantity);

    const totalCost = order.reduce((acc, el) => (acc + (+el.finalPrice * el.quantity)), 0);

    const cartShow = () => {
        dispatch(handleCartShow());
    }

    const handleClear = () => {
        dispatch(clearCart())
    }

    const handleEmptyClick = () => {
        alert('Добавьте товары в корзину!');
    }

    return (
        <div className={style.cartModalBack} onClick={cartShow}>
            <ul className={`${style.cartModal} ${style.listReset}`} onClick={(e) => e.stopPropagation()}>
                <li className={`${style.cartWrapper} ${style.cartWrapperStyle} ${style.flex}`}>
                    <h2>Корзина</h2>
                    <button className={style.btnReset} onClick={cartShow}>
                        <img src={closeModalIcon} className={style.closeModalIcon} alt='closeModalIcon'></img>
                    </button>
                </li>
                <div className={`${style.flexColumn} ${style.listStyle}`}>
                    {order.length > 0 && order.map((item) => (
                        <CartItem
                            key={item.id} {...item}

                        />
                    ))}
                    {!order.length && (<p className={`${style.cartEmpty} ${style.bold}`}>Корзина пуста</p>)}
                    <div className={style.clearBtn}>
                        <button className={style.btn} onClick={handleClear}>Очистить корзину</button>
                    </div>
                </div>
                <li className={`${style.cartWrapper} ${style.cartWrapperStyle} ${style.flex}`}>
                    <div className={style.flex}>
                        <p>Общая стоимость:</p>
                        <span className={style.bold}>{totalCost} руб.</span>
                    </div>
                    {/*<button onClick={handleOpenCheckout}><p>Оформить</p></button>*/}
                    {order.length > 0 && <Link to='/checkout_form'>Оформить</Link>}
                    {order.length <= 0 && <button onClick={handleEmptyClick} className={style.btnReset}>Оформить</button>}

                </li>
            </ul>
        </div>

    )
}

export { CartList }