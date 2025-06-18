import {AppDispatch, RootState} from "../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../../store/reducers/authSlice.ts";
import {useEffect, useState} from "react";
import * as React from "react";
import style from "./style.module.scss";

interface AuthModalProps {
  onClose: () => void;
  showAuthModal: boolean;
}

const AuthModal = ({onClose, showAuthModal}: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {users} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = users.find(user =>
      user.email === email && user.password === password
    );
    if (!user) {
      setError('Неправильный логин или пароль!')
      return;
    } else {
      dispatch(loginSuccess(user));
    }
    onClose()
  }


  useEffect(() => {
    const handleModalClose = ((e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    })
    if (showAuthModal) {
      window.addEventListener('keydown', handleModalClose)
    }

    return () => {
      window.removeEventListener('keydown', handleModalClose)
    }
  }, [showAuthModal]);

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={style.modalHeader}>Авторизация</h2>
        {error && <div className={style.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label className={style.labelForm}>Email</label>
            <input
              className={style.inputForm}
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={style.formGroup}>
            <label className={style.labelForm}>Пароль</label>
            <input
              className={style.inputForm}
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={style.submitButton}>
            Войти в аккаунт
          </button>
        </form>
      </div>
    </div>
  );
}

export { AuthModal };