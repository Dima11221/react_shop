import {GoodsItem} from "../GoodsItem/GoodsItem.tsx";
import style from './style.module.scss'

import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {IGoodsItemProp} from "../../types/Types.ts";

interface IFiteredGoods {
    goods: IGoodsItemProp[];
}

const GoodsList = ({goods}: IFiteredGoods) => {
    // const dispatch = useDispatch();
    // const goods = useSelector((state: RootState) => state.shop.goods);
    const currentPage = useSelector((state: RootState) => state.shop.currentPage);
    const itemsPerPage = useSelector((state: RootState) => state.shop.itemsPerPage);
    console.log(goods, "goods");

    const getCurrentPageGoods = () => {
        const startIndexInPage = (currentPage - 1) * itemsPerPage;
        const endIndexInPage = currentPage * itemsPerPage;
        return goods.slice(startIndexInPage, endIndexInPage);
    }

    const goodsPerPage = getCurrentPageGoods();
    console.log(goodsPerPage, "goodsPerPage");

    return (
      <div className={style.goodsList}>
          {goodsPerPage.length > 0 && (
            goodsPerPage.map((item) => (
              <GoodsItem key={item.mainId} {...item}/>
            ))
          )}
          {!goodsPerPage.length && (
            <h4>Couldn't find anything, or you entered the name incorrectly.</h4>
          )}
      </div>
    )
}

export {GoodsList}