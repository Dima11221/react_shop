import {AppDispatch, RootState} from "../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess} from "../../store/reducers/authSlice.ts";
import {useState} from "react";
import * as React from "react";
import style from "./style.module.scss";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal = ({onClose}: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {users} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = users.find(user =>
      user.email === email && user.password === password
    );
    if (!user) {
      alert('Неправильный логин или пароль!')
      return;
    } else {
      dispatch(loginSuccess(user));
    }
    onClose()
  }

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <h2>Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={style.btn}>
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export { AuthModal };