import style from './style.module.scss'
import backetIcon from "../../icons/backet_icon_2.svg"
// import {ICartItem} from "../../types/Types.ts";

interface ICartProp {
    quantity: number;
    handleCartShow: () => void;
}

const Cart= (props: ICartProp) => {
    const {quantity = 0, handleCartShow} = props

    return (
        <div
            className={`${style.cartClick} ${style.flexRow}`}
            onClick={handleCartShow}
        >
            <img src={backetIcon} className={style.cartImage} alt={backetIcon} ></img>
            {quantity && (<span className=''>{quantity}</span>)}
            {!quantity && null}
        </div>
    )
}

export { Cart }