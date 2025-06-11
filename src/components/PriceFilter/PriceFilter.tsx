import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {setCurrentPage} from "../../store/reducers/shopSlice.ts";

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
    <div>
      <h3>Фильтр по цене</h3>
      <form>
        <div>
          <label>От: </label>
          <input
            type="number"
            placeholder='Минимальная цена'
            value={minPrice || ''}
            min='0'
            onChange={(e) => {
              setMinPrice(+e.target.value);
            }}
          />
        </div>
        <div>
          <label>До: </label>
          <input
            type="number"
            placeholder='Максимальная цена'
            value={maxPrice || ''}
            max='0'
            onChange={(e) => {
              setMaxPrice(+e.target.value);
            }}
          />
        </div>
        <div>
          <button
            type='submit'
            onClick={handleSubmit}
          >
            Применить
          </button>
          <button
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