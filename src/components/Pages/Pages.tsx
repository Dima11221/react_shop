import style from "./style.module.scss"
import {useContext} from "react";
import {ShopContext} from "../../context.tsx";


const Pages = () => {
  const {currentPage, pagesCount, handlePrevPage, handleNextPage} = useContext(ShopContext)


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
      <span>{currentPage} из {pagesCount}</span>
    </div>
  )
}

export { Pages };