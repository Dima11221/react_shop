import style from './style.module.scss'
import backetIcon from "../../icons/backet_icon_2.svg"
import {useDispatch} from "react-redux";
import {handleCartShow} from "../../store/reducers/shopSlice.ts";


interface ICartProp {
    quantity: number;
}

const Cart= (prop: ICartProp) => {
    const {quantity = 0} = prop;
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(handleCartShow())
    }

// const quantity = order.length;

    return (

        <div
            className={style.cart}
            onClick={handleClick}
        >
            <img src={backetIcon} className={style.cartImage} alt={backetIcon} ></img>
            {quantity > 0 && (<p className={style.quantity}>{quantity}</p>)}
        </div>
    )
}

export { Cart }