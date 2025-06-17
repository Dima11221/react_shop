import style from './style.module.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {UserProfile} from "../../components/UserProfile/UserProfile.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {AuthModal} from "../../components/AuthModal/AuthModal.tsx";
import {RegisterModal} from "../../components/RegisterModal/RegisterModal.tsx";
import LogoFortnite from "../../icons/LogoFortnite.svg?react"

interface IProps {
  title: string;
}

const Header = ({title}: IProps) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const {isAuth} = useSelector((state: RootState) => state.auth);

  const handleUserToggleModal = () => {
    setOpenUserModal(!openUserModal);
  }

  // const openModalAuth = () => {
  //   setShowAuthModal(true);
  // }
  const closeModalAuth = () => {
    setShowAuthModal(false);
  }
  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
    setShowRegModal(false);
  }
  const closeModalReg = () => {
    setShowRegModal(false);
  }
  const toggleRegModal = () => {
    setShowRegModal(!showRegModal);
    setShowAuthModal(false);
  }

  useEffect(() => {
    setShowAuthModal(false);
    setShowRegModal(false);
  }, [setShowAuthModal, setShowRegModal])


  return (
    <header className={`${style.headFoot} ${style.flex}`}>
      <div className={`${style.container} ${style.headFootWrapper} ${style.headFlex}`}>
        <Link to='/'>
          <LogoFortnite />
        </Link>
        <div >
          <h2 className={style.headLink}>
            <Link to='/'>{title}</Link>
          </h2>
          <h3 className={style.headLink}>
            <Link to='/'>Главная страница</Link>
          </h3>
        </div>
      </div>

      <div className={`${style.flexColumn} ${style.headFootWrapper}`}>
        <button onClick={handleUserToggleModal} className={style.btn}>Мой профиль</button>
        <div className={`${style.headFootWrapper}`}>
          {openUserModal &&
						<div>
							<div>
                {isAuth && (
                  <UserProfile />
                )}
                {!isAuth && (
                  <div>
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
                {showAuthModal && (
                  <AuthModal onClose={closeModalAuth} />
                )}
							</div>
							<div>
                {showRegModal && (
                  <RegisterModal onClose={closeModalReg} />
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