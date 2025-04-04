import {CartItem} from "../CartItem/CartItem.tsx";
import style from './style.module.scss'
import {IDItemProp, IOrderItem} from "../Shop/Shop.tsx";
// import {ICartItem} from "../../types/Types.ts";
import closeModalIcon from '../../icons/closeModalIcon.svg'


interface IOrderList {
    order: IOrderItem[];
    handleCartShow: () => void;
    removeFromCart: (item: IDItemProp) => void;
    incQuantity: (item: IDItemProp) => void;
    decQuantity: (item: IDItemProp) => void;
    clearCart: () => void;
}

const CartList = (props: IOrderList) => {
    const {order = [], handleCartShow, removeFromCart, incQuantity, decQuantity, clearCart} = props;

    const totalCost = order.reduce((acc, el) => (acc + (+el.finalPrice * el.quantity)), 0)

    return (
        <div className={style.cartModalBack} onClick={handleCartShow}>
            <ul className={`${style.cartModal} ${style.listReset}`} onClick={(e) => e.stopPropagation()}>
                <li className={`${style.cartWrapper} ${style.cartWrapperStyle} ${style.flex}`}>
                    <p>Корзина</p>
                    <button className={style.btnReset} onClick={handleCartShow}>
                        <img src={closeModalIcon} className={style.closeModalIcon}></img>
                    </button>
                </li>
                <div className={`${style.flexColumn} ${style.listStyle}`}>
                    {order.length > 0 && order.map((item) => (
                        <CartItem
                            key={item.id} {...item}
                            removeFromCart={removeFromCart}
                            incQuantity={incQuantity}
                            decQuantity={decQuantity}
                        />
                    ))}
                    {!order.length && (<p className={`${style.cartEmpty} ${style.bold}`}>Корзина пуста</p>)}
                    <div className={style.clearBtn}>
                        <button className={style.btn} onClick={clearCart}>Очистить корзину</button>
                    </div>
                </div>
                <li className={`${style.cartWrapper} ${style.cartWrapperStyle} ${style.flex}`}>
                    <div className={style.flex}>
                        <p>Общая стоимость:</p>
                        <span className={style.bold}>{totalCost} руб.</span>
                    </div>
                    <button><p>Оформить</p></button>
                </li>
            </ul>
        </div>

    )
}

export { CartList }