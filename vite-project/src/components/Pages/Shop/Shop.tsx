import {useEffect, useState} from "react";
import {Preloader} from "../../../shared/ui/Preloader/Preloader.tsx";
import {GoodsList} from "../../../features/goods/GoodsList/GoodsList.tsx";
import {ICartItem, IGoodsItemProp} from "../../../shared/types/Types.ts";
import {Cart} from "../../../features/cart/Cart/Cart.tsx";
import {CartList} from "../../../features/cart/CartList/CartList.tsx";
import {Alert} from "../../../shared/ui/Alert/Alert.tsx";

import {Pages} from "../../../shared/ui/Pagination/Pages.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store.ts";
import {
    handleCartShow,
    setCurrentPage,
    setOrderLocalStorage,
    setPagesCount
} from "../../../store/reducers/shopSlice.ts";
import {fetchGoods} from "../../../store/reducers/thunk.ts";
import {CheckoutForm} from "../CheckoutForm/CheckoutForm.tsx";
import {Search} from "../../../features/search/Search/Search.tsx";
import {PriceFilter} from "../../../features/PriceFilter/PriceFilter.tsx";
import style from "./style.module.scss"

export interface IOrderItem extends ICartItem{
    quantity: number;
}


const Shop = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading =  useSelector((state: RootState) => state.shop.loading);
    const order =  useSelector((state: RootState) => state.shop.order);
    const isCartShow = useSelector((state: RootState) => state.shop.isCartShow);
    const alertName = useSelector((state: RootState) => state.shop.alertName);
    const goods = useSelector((state: RootState) => state.shop.goods);
    const CartOrder = order.reduce((acc, item) => acc + item.quantity, 0)
    const itemsPerPage = useSelector((state: RootState) => state.shop.itemsPerPage);

    const [filteredGoods, setFilteredGoods] = useState<IGoodsItemProp[]>(goods);
    const [priceFilter, setPriceFilter] = useState<{min: number, max: number}>({min: 0, max: 0});
    const [searchStr, setSearchStr] = useState<string>('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    const filters = () => {
        let result = goods;

        if (searchStr) {
            result = result.filter(good =>
              good.displayName.toLowerCase().includes(searchStr.toLowerCase())
            );

        }

        if (priceFilter.min > 0 || priceFilter.max > 0) {
            result = result.filter(good => {
                const price = good.price.finalPrice;
                return (
                  (priceFilter.min === 0 || priceFilter.min <= price) &&
                  (priceFilter.max === 0 || priceFilter.max >= price)
                )
            });
        }

        setFilteredGoods(result);
        dispatch(setPagesCount(Math.ceil(result.length / itemsPerPage)));
    }

    useEffect(() => {
        filters();
    }, [goods, filters]);

    // useEffect(() => {
    //     setPriceFilter({min: 0, max: 0});
    //     setFilteredGoods(goods);
    //     dispatch(setPagesCount(Math.ceil(goods.length/itemsPerPage)));
    //     // console.log(goods);
    // }, [goods, dispatch, setPagesCount]);

    const handleSearch = (str: string) => {
        setSearchStr(str);
        // console.log(str);
        dispatch(setCurrentPage(1));
        filters()
    }

    const handlePriceFilter = (min: number, max: number) => {
        setPriceFilter({min, max});
        dispatch(setCurrentPage(1));
        filters();
    }

    useEffect(() => {
        const savedOrder = localStorage.getItem("cart");

        if (savedOrder) {
            try {
                const storage = JSON.parse(savedOrder);
                dispatch(setOrderLocalStorage(storage));
            }
            catch (e) {
                console.error("Error fetching cart", e);
            }
        }
    }, [dispatch]);

    const isCheckoutOpen = useSelector((state: RootState) => state.shop.isCheckoutOpen)


    useEffect(() => {
        dispatch(fetchGoods());
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(order))
    }, [order])


    useEffect(()=> {
        if (!isCartShow) return;

        const handleCartClose = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') {
                dispatch(handleCartShow())
            }
        }

        if (isCartShow || isCheckoutOpen) {
            window.addEventListener('keydown', handleCartClose)
        }

        return () => {
            window.removeEventListener('keydown', handleCartClose)
        }
    }, [isCheckoutOpen, isCartShow, dispatch])

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('keydown', handleResize);
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
      <div>
          <div className={style.wrapperMenu}>
              <h2 className={style.title}>Магазин предметов</h2>
              {isMobileView && (
                <button className={style.btn} onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? 'Закрыть' : 'Фильтры'}
                </button>
              )}
          </div>
          <div className={`${style.filtersContainer} ${!isMobileMenuOpen && isMobileView ? '' : style.visible}`}>

              <div className={`${style.SFWrapper}`}>
                  <div className={style.searchWrapper}>
                      <Search handleSearch={handleSearch} />
                  </div>
                  <div className={style.priceFilterWrapper}>
                      <PriceFilter handlePriceFilter={handlePriceFilter}/>
                  </div>
              </div>
          </div>
          <Cart quantity={CartOrder}/>
          {loading && (<Preloader />)}

          {!loading && (
            <>
                <GoodsList filteredGoods={filteredGoods}/>
                <Pages />
            </>
          )}
          {
            isCartShow && <CartList/>
          }
          {alertName && <Alert/>}
          {isCheckoutOpen && <CheckoutForm />}
      </div>
    )
}

export {Shop}