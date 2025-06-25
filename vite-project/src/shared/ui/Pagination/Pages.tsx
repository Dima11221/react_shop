import style from "./style.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types/store.ts";
import {setCurrentPage} from "../../../features/shop/shopSlice.ts";


const Pages = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector((state: RootState) => state.shop.currentPage);
  const pagesCount = useSelector((state: RootState) => state.shop.pagesCount);
  const handleNextPage = () => {
    if (currentPage < pagesCount) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  }



  return (
    <div className={style.pagesList}>
      <div className={style.btnsWrapper}>
        <button
          type="button"
          className={`${style.btn} ${style.infoBtn}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Предыдущая страница
        </button>
        <button
          type="button"
          className={`${style.btn} ${style.infoBtn}`}
          onClick={handleNextPage}
          disabled={currentPage === pagesCount}
        >
          Следующая страница
        </button>
      </div>
      <span className={style.pages}>{currentPage <= pagesCount ? `${currentPage} из ${pagesCount}` : ''}</span>
    </div>
  )
}

export { Pages };