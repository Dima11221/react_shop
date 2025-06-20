import {CartItem} from "../CartItem/CartItem.tsx";
import style from './style.module.scss'
import closeModalIcon from '../../icons/closeModalIcon.svg'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {clearCart, handleCartShow} from "../../store/reducers/shopSlice.ts";
import {Link} from "react-router-dom";
import {AuthModal} from "../AuthModal/AuthModal.tsx";
import {handleAuthShow} from "../../store/reducers/authSlice.ts";



const CartList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const order =  useSelector((state: RootState) => state.shop.order);
    // const quantity = useSelector((state: RootState) => state.shop.quantity);
    const totalCost = order.reduce((acc, el) => (acc + (+el.finalPrice * el.quantity)), 0);
    const {isAuth, isAuthUserOpen} = useSelector((state: RootState) => state.auth);

    const handleShowAuthModal = () => {
        if (!isAuth) {
            dispatch(handleAuthShow(true));
            alert('Сначала авторизируйтесь!');
            // console.log(showAuthModal);
            return;
        }
    }


    const cartShow = () => {
        dispatch(handleCartShow());
    };

    const handleClear = () => {
        dispatch(clearCart())
    };

    const handleEmptyClick = () => {
        alert('Добавьте товары в корзину!');
    }

    return (
        <div className={style.cartModalBack} onClick={cartShow}>
            <ul className={`${style.cartModal} ${style.listReset}`} onClick={(e) => e.stopPropagation()}>
                <li className={`${style.cartHeader} ${style.flex}`}>
                    <h2 className={style.cartTitle}>Корзина</h2>
                    <button className={style.closeButton} onClick={cartShow}>
                        <img src={closeModalIcon} className={style.closeIcon} alt='closeModalIcon'></img>
                    </button>
                </li>
                <div className={style.itemsContainer}>
                    {order.length > 0 && (
                      <>
                        <div className={style.itemsList}>
                            {order.map((item) => (
                              <CartItem key={item.id} {...item}/>
                            ))}
                        </div>
                        <div className={style.clearContainer}>
                            <button
                              className={style.button}
                              onClick={handleClear}
                            >
                                Очистить корзину
                            </button>
                        </div>
                      </>
                    )}
                    {!order.length && (<p className={style.emptyCart}>Корзина пуста</p>)}
                </div>
                <li className={style.cartFooter}>
                    <div className={style.totalContainer}>
                        <p className={style.totalText}>Общая стоимость:</p>
                        <span className={style.totalPrice}>{totalCost} V-Bucks</span>
                    </div>
                    {order.length > 0 &&
                        <Link
                          to={isAuth ? '/checkout_form' : '#'}
                          className={style.checkoutButton}
                          onClick={isAuth ? undefined : handleShowAuthModal}
                        >
                          Оформить
                        </Link>}
                    {isAuthUserOpen && (
                        <AuthModal />
                    )}

                    {order.length <= 0 &&
                      <button
                        onClick={handleEmptyClick}
                        className={`${style.checkoutButton} ${style.disabledButton}`}
                      >
                          Оформить
                      </button>
                    }

                </li>
            </ul>
        </div>

    )
}

export { CartList }