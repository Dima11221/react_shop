import {useState} from "react";
import {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";
import {IUser} from "../../types/Types.ts";
import {registerSuccess} from "../../store/reducers/authSlice.ts";
import style from "./style.module.scss"

interface IRegisterModalProps {
  onClose: () => void;
}

const RegisterModal= ({onClose}: IRegisterModalProps) => {
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

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <h2>Регистрация</h2>
        {error && (<span>{error}</span>)}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Логин</label>
            <input
              type="username"
              name="username"
              placeholder="Ваш логин"
              value={registerData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Ваш email"
              value={registerData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Ваш пароль"
              value={registerData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password_confirmation"
              name="password_confirmation"
              placeholder="Повторите пароль"
              value={registerData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={style.btn}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  )
}

export { RegisterModal }