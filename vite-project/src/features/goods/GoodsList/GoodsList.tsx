import {GoodsItem} from "../GoodsItem/GoodsItem.tsx";
import style from './style.module.scss'

import {useSelector} from "react-redux";
import {RootState} from "../../../shared/types/store.ts";
import {IGoodsItemProp} from "../../../shared/types/Types.ts";

interface IFilteredGoods {
    filteredGoods: IGoodsItemProp[];
}

const GoodsList = ({filteredGoods}:IFilteredGoods) => {
    const currentPage = useSelector((state: RootState) => state.shop.currentPage);
    const itemsPerPage = useSelector((state: RootState) => state.shop.itemsPerPage);

    const getCurrentPageGoods = () => {
        const startIndexInPage = (currentPage - 1) * itemsPerPage;
        const endIndexInPage = currentPage * itemsPerPage;
        return filteredGoods.slice(startIndexInPage, endIndexInPage);
    }

    const goodsPerPage = getCurrentPageGoods();

    if (filteredGoods.length === 0) {
        return <div>
            <h3 className={style.text}>Товары не найдены. Попробуйте изменить параметр фильтрации.</h3>
        </div>
    }

    return (
      <div className={style.goodsList}>
          {goodsPerPage.length > 0 && (
            goodsPerPage.map((item) => (
              <GoodsItem key={item.mainId} {...item}/>
            ))
          )}
          {!goodsPerPage.length && (
            <h3 className={style.text}>Товары не найдены.</h3>
          )}
      </div>
    )
}

export {GoodsList}