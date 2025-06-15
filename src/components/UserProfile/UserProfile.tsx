import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {logout} from "../../store/reducers/authSlice.ts";
import style from "../../layout/Header/style.module.scss";


const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout())
  }

  if (!user) return null

  return (
    <div>
      <div>
        <h2>{user.userName}</h2>
        <h2>{user.email}</h2>
      </div>
      <button onClick={handleLogout} className={style.btn}>
        Выйти
      </button>
    </div>
  )
}

export { UserProfile }