import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../shared/types/store.ts";
import {logout} from "../../auth/authSlice.ts";
import style from "./style.module.scss";


const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!user) return null

  return (
    <div className={style.profileContainer}>
      <div className={style.userInfo}>
        <h2>Логин: {user.userName}</h2>
        <h2>Почта: {user.email}</h2>
      </div>
      <button
        onClick={handleLogout}
        className={`${style.btn} ${style.logoutButton}`}
      >
        Выйти
      </button>
    </div>
  )
}

export { UserProfile }