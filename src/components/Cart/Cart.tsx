import style from './style.module.scss'
import backetIcon from "../../icons/backet_icon_2.svg"
// import {ICartItem} from "../../types/Types.ts";
import { useContext } from "react";
import { ShopContext } from "../../context.tsx";


interface ICartProp {
    quantity: number;
}

const Cart= (prop: ICartProp) => {
    const {quantity = 0} = prop;

    const {handleCartShow} = useContext(ShopContext);

    // const quantity = order.length;

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