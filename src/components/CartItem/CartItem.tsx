import {IOrderItem} from "../Shop/Shop.tsx";
import style from './style.module.scss'
import closeIcon from "../../icons/close_icon.svg"
import plus from "../../icons/plusIcon.svg"
import minus from "../../icons/minusIcon.svg"
import {useContext} from "react";
import {ShopContext} from "../../context.tsx";

// interface ICartItemForDelete extends IOrderItem {
//     removeFromCart: (item: IDItemProp) => void;
//     incQuantity: (item: IDItemProp) => void;
//     decQuantity: (item: IDItemProp) => void;
// }

const CartItem = (props: IOrderItem) => {
    const {
        id,
        name,
        finalPrice,
        quantity,
    } = props;


    const {removeFromCart, incQuantity, decQuantity} = useContext(ShopContext);

    return (
        <li className={`${style.cartItem} ${style.flex}`}>
            <span className={style.cartInfo}>{name} x {quantity} = {finalPrice * quantity} руб. </span>
            <div className={`${style.flex} ${style.plusMinusContent}`}>

                <button className={style.btnReset} onClick={() => incQuantity(id)}>
                    <img src={plus} alt={plus} className={style.iconButton}></img>
                </button>
                <button className={style.btnReset} onClick={() => decQuantity(id)}>
                    <img src={minus} alt={minus} className={style.iconButton}></img>
                </button>
            </div>

            <button className={style.btnReset} onClick={() => removeFromCart(id)}>
                <img src={closeIcon} className={style.iconCloseButton}></img>
            </button>
        </li>
    )
}

export {CartItem}