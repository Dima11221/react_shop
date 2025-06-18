import {useEffect, useState} from "react";
import {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {IUser} from "../../types/Types.ts";
import {registerSuccess} from "../../store/reducers/authSlice.ts";
import style from "./style.module.scss"

interface IRegisterModalProps {
  onClose: () => void;
  showRegModal: boolean;
}

const RegisterModal= ({onClose, showRegModal}: IRegisterModalProps) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData(prev => ({...prev, [name]: value}));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (registerData.password !== registerData.password_confirmation) {
      setError('Пароли не совпадают!');
      return;
    }
    if (registerData.password.length < 6) {
      setError('Длина пароля должна быть больше шести символов!');
      return;
    }

    const newUser: IUser = {
      id: Date.now().toString(),
      userName: registerData.username,
      email: registerData.email,
      password: registerData.password,
      isAuth: true,
      lastLogin: Date.now(),
    }
    console.log(newUser);
    dispatch(registerSuccess(newUser));
    onClose()
  }


  useEffect(() => {
    const handleModalClose = ((e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    })
    if (showRegModal) {
      window.addEventListener('keydown', handleModalClose)
    }

    return () => {
      window.removeEventListener('keydown', handleModalClose)
    }
  }, [showRegModal]);

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={style.modalHeader}>Регистрация</h2>
        {error && <div className={style.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label className={style.labelForm}>Логин</label>
            <input
              className={style.inputForm}
              type="text"
              name="username"
              placeholder="Логин"
              value={registerData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label className={style.labelForm}>Email</label>
            <input
              className={style.inputForm}
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={registerData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label className={style.labelForm}>Пароль</label>
            <input
              className={style.inputForm}
              type="password"
              name="password"
              placeholder="Не менее 6 символов"
              value={registerData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label className={style.labelForm}>Подтвердите пароль</label>
            <input
              className={style.inputForm}
              type="password"
              name="password_confirmation"
              placeholder="Повторите пароль"
              value={registerData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={style.submitButton}>
            Создать аккаунт
          </button>
        </form>
      </div>
    </div>
  );
}

export { RegisterModal }