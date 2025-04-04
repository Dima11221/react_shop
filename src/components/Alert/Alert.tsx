import {useEffect} from "react";
import style from './style.module.scss'

interface IAlertProps {
    closeAlert: () => void;
    name: string
}

const Alert = (props: IAlertProps) => {
    const {name = '', closeAlert} = props;

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