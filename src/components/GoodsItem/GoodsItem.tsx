import {IGoodsItemProp} from "../../types/Types.ts";
import style from './style.module.scss'

import { useContext } from "react";
import { ShopContext } from "../../context.tsx";



const GoodsItem = (props: IGoodsItemProp) => {


    const {
        mainId: id,
        displayName: name,
        displayDescription: description,
        price: {finalPrice},
        displayAssets,
    } = props;

    const fullBackground = displayAssets.length > 0 ? displayAssets[0].full_background : "https://via.placeholder.com/300";
    // const finalPrice = price.finalPrice ?? "Не указано";


    const {addToCart} = useContext(ShopContext);

    return (
        <div className={style.GoodItemCard} id={id}>
            <div className="">
                <img className={style.poster} src={fullBackground} alt={name}/>
            </div>
            <div className={`${style.cardContent} ${style.left}`}>
                <h3 className={style.title}>{name}</h3>
                <p>{description}</p>
            </div>
            <div className={`${style.flex} ${style.deal}`}>
                <button className={`${style.btn} ${style.infoBtn}`} onClick={() => addToCart({
                    id,
                    name,
                    finalPrice
                })}>Купить</button>
                <span>Цена: {finalPrice}</span>
            </div>
        </div>
    )
}


export {GoodsItem}