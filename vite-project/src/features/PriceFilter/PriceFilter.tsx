import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store/store.ts";
import {setCurrentPage} from "../../app/store/slices/shopSlice.ts";
import style from "./style.module.scss"

interface IPriceFilter {
  handlePriceFilter: (min: number, max: number) => void;
  // currentMinPrice: number;
  // currentMaxPrice: number;
}

const PriceFilter = ({handlePriceFilter}: IPriceFilter) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    handlePriceFilter(minPrice, maxPrice);
  }

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    setMaxPrice(0);
    setMinPrice(0);
    handlePriceFilter(0, 0);
  }

  return (
    <div className={style.filterContainer}>
      <form className={style.form}>
        <div className={style.inputGroup}>
          <label className={style.label}>От: </label>
          <input
            className={style.input}
            type="number"
            placeholder='Минимальная цена'
            value={minPrice || ''}
            min='0'
            onChange={(e) => {
              setMinPrice(+e.target.value);
            }}
          />
        </div>
        <div className={style.inputGroup}>
          <label className={style.label}>До: </label>
          <input
            className={style.input}
            type="number"
            placeholder='Максимальная цена'
            value={maxPrice || ''}
            max='0'
            onChange={(e) => {
              setMaxPrice(+e.target.value);
            }}
          />
        </div>
        <div className={style.buttons}>
          <button
            className={style.button}
            type='submit'
            onClick={handleSubmit}
          >
            Применить
          </button>
          <button
            className={`${style.button}`}
            type='button'
            onClick={handleReset}
          >
            Сбросить
          </button>
        </div>
      </form>
    </div>
  )
}

export { PriceFilter };