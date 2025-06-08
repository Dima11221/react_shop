import {IOrderItem} from "../Pages/Shop/Shop.tsx";
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
            <h3 className={style.cartInfo}>{name}</h3>
            <div className={`${style.flex} ${style.plusMinusContent}`}>

                <button className={style.btnReset} onClick={incrementQuantity}>
                    <img src={plus} alt={plus} className={style.iconButton}></img>
                </button>
                <span>{quantity}</span>
                <button className={style.btnReset} onClick={decrementQuantity}>
                    <img src={minus} alt={minus} className={style.iconButton}></img>
                </button>
            </div>
            <h3>{finalPrice * quantity} руб.</h3>

            <button className={style.btnReset} onClick={removeCart}>
                <img src={closeIcon} className={style.iconCloseButton}></img>
            </button>
        </li>
    )
}

export {CartItem}