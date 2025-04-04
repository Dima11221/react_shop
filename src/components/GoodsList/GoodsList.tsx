import {GoodsItem} from "../GoodsItem/GoodsItem.tsx";
import {ICartItem, IGoodsItemProp} from "../../types/Types.ts";
import style from './style.module.scss'

interface IGoodsList {
    goods: IGoodsItemProp[],
    addToCart: (item: ICartItem) => void
}

const GoodsList = (props: IGoodsList) => {
    const {goods = [], addToCart} = props;

    return (
        <div className={style.goodsList}>
            {goods.length > 0 && (
                goods.map((item) => (
                    <GoodsItem key={item.mainId} {...item} addToCart={addToCart}/>
                ))
            )}
            {!goods.length && (
                <h4>Couldn't find anything, or you entered the name incorrectly.</h4>
            )}
        </div>
    )
}

export {GoodsList}