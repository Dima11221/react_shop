import {IGoodsItemProp} from "../../types/Types.ts";
import style from './style.module.scss'
import {useDispatch} from "react-redux";
import {addToCart} from "../../store/reducers/shopSlice.ts";
import {AppDispatch} from "../../store/store.ts";
import {Link} from "react-router-dom";



const GoodsItem = (props: IGoodsItemProp) => {
  const {
      mainId: id,
      displayName: name,
      displayDescription: description,
      price: {finalPrice},
      displayAssets,
  } = props;

  const dispatch = useDispatch<AppDispatch>();
  const iconBackground = displayAssets.length > 0 ? displayAssets[0].background : "https://via.placeholder.com/300";

  const handleAddToCart = () => {
    dispatch(addToCart({
      id,
      name,
      finalPrice
    }))
  }

  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img className={style.image} src={iconBackground} alt={name}/>
        <div className={style.priceBadge}>
          {finalPrice} V-Bucks
        </div>
      </div>

      <div className={style.content}>
        <h3 className={style.title}>{name}</h3>
        <p className={style.description}>
          {description || 'Описание скоро добавим...'}
        </p>

        <div className={style.buttons}>
          <button
            className={`${style.buttonsPos} ${style.cartButton}`}
            onClick={handleAddToCart}
          >
            В корзину
          </button>
          <Link
            to="/checkout_form"
            className={`${style.buttonsPos} ${style.buyButton}`}
            onClick={handleAddToCart}
          >
            Купить сейчас
          </Link>
        </div>
      </div>
    </div>
  )
}


export {GoodsItem}