import {Header} from "./layout/Header/Header.tsx";
import {Footer} from "./layout/Footer/Footer.tsx";
import {Shop} from "./components/Pages/Shop/Shop.tsx";
import {HashRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {CheckoutForm} from "./components/Pages/CheckoutForm/CheckoutForm.tsx";
import style from './styles/app.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store/store.ts";
import {useEffect} from "react";
import {loginSuccess} from "./store/reducers/authSlice.ts";


function App() {
  const {isAuth} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const interval = setInterval(() =>{
  //     dispatch(checkSession())
  //   }, 10000);
  //
  //   return () => clearInterval(interval)
  // }, [dispatch]);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      // const sessionDuration = 10000;

      const sessionDuration = 1*24*60*60*1000;
      const userSession = Date.now() - parsedUser.lastLogin;
      if (userSession > sessionDuration) {
        localStorage.removeItem('currentUser');
      } else {
        dispatch(loginSuccess(JSON.parse(user)));
      }
    }
  }, [dispatch])

  return (
    <Router>
      <div className={style.fullBackground}>
        <div className={style.particleEffect}></div>
        <div className={style.body}>
          <Header title={'Fortnite shop'} />
          <div className={style.main}>
            <div className={style.mainWrapper}>
              <Routes>
                <Route path="/" element={<Shop />} />
                <Route
                  path='/checkout_form'
                  // element={<CheckoutForm />}
                  element={isAuth ? <CheckoutForm /> : <Navigate to='/' />}
                />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </div>

    </Router>
  )
}

export default App