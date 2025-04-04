import {ICartItem, IGoodsItemProp} from "../../types/Types.ts";
import style from './style.module.scss'

interface GoodsItemProps extends IGoodsItemProp {
    addToCart: (item: ICartItem) => void;
}


const GoodsItem = (props: GoodsItemProps) => {

    // if (!props.price?.finalPrice || !Array.isArray(props.displayAssets) || props.displayAssets.length === 0) {
    //     return null;
    // }

    // console.log("price:", props.price);
    // console.log("displayAssets:", props.displayAssets);
    const {
        mainId: id,
        displayName: name,
        displayDescription: description,
        price: {finalPrice},
        displayAssets,
        addToCart
    } = props;

    const fullBackground = displayAssets.length > 0 ? displayAssets[0].full_background : "https://via.placeholder.com/300";
    // const finalPrice = price.finalPrice ?? "Не указано";

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