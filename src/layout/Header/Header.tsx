import style from './style.module.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {UserProfile} from "../../components/UserProfile/UserProfile.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {AuthModal} from "../../components/AuthModal/AuthModal.tsx";
import {RegisterModal} from "../../components/RegisterModal/RegisterModal.tsx";
import LogoFortnite from "../../icons/LogoFortnite.svg?react"
import {handleAuthShow, handleRegShow} from "../../store/reducers/authSlice.ts";


const Header = () => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const {isAuth, isAuthUserOpen, isRegUserOpen} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleUserToggleModal = () => {
    setOpenUserModal(!openUserModal);
  }

  const toggleAuthModal = () => {
    dispatch(handleAuthShow(!isAuthUserOpen))
    dispatch(handleRegShow(false));
  }
  const toggleRegModal = () => {
    dispatch(handleRegShow(!isRegUserOpen));
    dispatch(handleAuthShow(false));
  }

  useEffect(() => {
    dispatch(handleAuthShow(false));
    dispatch(handleRegShow(false));

  }, [dispatch])


  return (
    <header className={`${style.headFoot}`}>
      <div className={`${style.container} ${style.headFootWrapper} ${style.headFlex}`}>
        <Link to='/'>
          <LogoFortnite />
        </Link>
        {/*<div >*/}
        {/*  <h2 className={style.headLink}>*/}
        {/*    <Link to='/'>{title}</Link>*/}
        {/*  </h2>*/}
        {/*  <h3 className={style.headLink}>*/}
        {/*    <Link to='/'>Главная страница</Link>*/}
        {/*  </h3>*/}
        {/*</div>*/}
      </div>

      <div className={`${style.flexColumn} ${style.headFootWrapper}`}>
        <button onClick={handleUserToggleModal} className={style.btn}>Мой профиль</button>
        <div className=''>
          {openUserModal &&
						<div>
							<div>
                {isAuth && (
                  <UserProfile />
                )}
                {!isAuth && (
                  <div className={style.headFlex}>
                    <button onClick={toggleAuthModal} className={style.btn}>
                      Войти
                    </button>
                    <button onClick={toggleRegModal} className={style.btn}>
                      Регистрация
                    </button>
                  </div>
                )}
							</div>
							<div>
                {isAuthUserOpen && (
                  <AuthModal />
                )}
							</div>
							<div>
                {isRegUserOpen && (
                  <RegisterModal />
                )}
							</div>
						</div>
          }
        </div>
      </div>

    </header>
  )
}

export {Header}