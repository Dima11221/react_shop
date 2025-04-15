import {useEffect} from "react";
import style from './style.module.scss'
import { useContext } from "react";
import { ShopContext } from "../../context.tsx";

interface IAlertProps {
    closeAlert: () => void;
    name: string
}

const Alert = () => {
    const {alertName: name = '', closeAlert} = useContext(ShopContext);

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000);

        return () => {
            clearTimeout(timerId)
        }
    }, [name])

    return (
        <div className={`${style.alertContainer} ${style.alertPosition}`}>
            <p>
                {name} добавлен в корзину
            </p>
        </div>
    )
}

export { Alert }