import {GoodsItem} from "../GoodsItem/GoodsItem.tsx";
import style from './style.module.scss'

import {useContext} from "react";
import {ShopContext} from "../../context.tsx";


const GoodsList = () => {
    const {getCurrentPageGoods} = useContext(ShopContext);
    const goods = getCurrentPageGoods();

    return (
        <div className={style.goodsList}>
            {goods.length > 0 && (
                goods.map((item) => (
                    <GoodsItem key={item.mainId} {...item}/>
                ))
            )}
            {!goods.length && (
                <h4>Couldn't find anything, or you entered the name incorrectly.</h4>
            )}
        </div>
    )
}

export {GoodsList}