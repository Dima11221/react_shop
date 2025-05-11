import style from "./style.module.scss"

interface IPagesProps {
  currentPage: number,
  setCurrentPage: (page: number) => void,
  pagesCount: number,
}

const Pages = ({currentPage, setCurrentPage, pagesCount}: IPagesProps) => {

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
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
      <span>{currentPage} из {pagesCount}</span>
    </div>
  )
}

export { Pages };