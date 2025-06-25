import {IOrderItem} from "../../../components/Pages/Shop/Shop.tsx";
import style from './style.module.scss'
import closeIcon from "../../../icons/close_icon.svg"
import plus from "../../../icons/plus_icon2.svg"
import minus from "../../../icons/minus_icon.svg"
import {useDispatch} from "react-redux";
import {decQuantity, incQuantity, removeFromCart} from "../../../store/reducers/shopSlice.ts";


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
    <div className={style.cartItem}>
      <div className={style.itemInfo}>
        <h3 className={style.itemName}>{name}</h3>
        <span className={style.itemPrice}>{finalPrice * quantity} V-Bucks</span>
      </div>

      <div className={style.quantityControls}>
        <button
          className={style.controlButton}
          onClick={decrementQuantity}
          aria-label="Уменьшить количество"
        >
          <img src={minus} alt="Уменьшить" className={style.controlIcon}/>
        </button>

        <span className={style.quantity}>{quantity}</span>

        <button
          className={style.controlButton}
          onClick={incrementQuantity}
          aria-label="Увеличить количество"
        >
          <img src={plus} alt="Увеличить" className={style.controlIcon}/>
        </button>

        <button
          className={style.removeButton}
          onClick={removeCart}
          aria-label="Удалить из корзины"
        >
          <img src={closeIcon} alt="Удалить" className={style.removeIcon}/>
        </button>
      </div>
    </div>
  )
}

export {CartItem}