import {useEffect} from "react";
import style from './style.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {closeAlert} from "../../../features/shop/shopSlice.ts";
import {RootState} from "../../types/store.ts";

// interface IAlertProps {
//     closeAlert: () => void;
//     name: string
// }

const Alert = () => {
    // const {alertName: name = '', closeAlert} = useContext(ShopContext);
    const dispatch = useDispatch();
    const alertName = useSelector((state: RootState) => state.shop.alertName);
    useEffect(() => {
        if (alertName) {
            const timerId = setTimeout(() => {
                dispatch(closeAlert());
            }, 3000);

            return () => clearTimeout(timerId);
        }


    }, [dispatch, alertName])

    return (
        <div className={`${style.alertContainer} ${style.alertPosition}`}>
            <p>
                {alertName} добавлен в корзину
            </p>
        </div>
    )
}

export { Alert }