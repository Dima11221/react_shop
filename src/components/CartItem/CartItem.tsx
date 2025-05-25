import {IOrderItem} from "../Shop/Shop.tsx";
import style from './style.module.scss'
import closeIcon from "../../icons/close_icon.svg"
import plus from "../../icons/plusIcon.svg"
import minus from "../../icons/minusIcon.svg"
import {useDispatch} from "react-redux";
import {decQuantity, incQuantity, removeFromCart} from "../../store/reducers/shopSlice.ts";


const CartItem = (props: IOrderItem) => {
    const {
        id,
        name,
        finalPrice,
        quantity,
    } = props;

    const dispatch = useDispatch();

    const incrementQuantity = () => {
      dispatch(incQuantity({id}))
    }

    const decrementQuantity = () => {
      dispatch(decQuantity({id}))
    }

    const removeCart = () => {
      dispatch(removeFromCart({id}))
    }

    return (
        <li className={`${style.cartItem} ${style.flex}`}>
            <span className={style.cartInfo}>{name} x {quantity} = {finalPrice * quantity} руб. </span>
            <div className={`${style.flex} ${style.plusMinusContent}`}>

                <button className={style.btnReset} onClick={incrementQuantity}>
                    <img src={plus} alt={plus} className={style.iconButton}></img>
                </button>
                <button className={style.btnReset} onClick={decrementQuantity}>
                    <img src={minus} alt={minus} className={style.iconButton}></img>
                </button>
            </div>

            <button className={style.btnReset} onClick={removeCart}>
                <img src={closeIcon} className={style.iconCloseButton}></img>
            </button>
        </li>
    )
}

export {CartItem}