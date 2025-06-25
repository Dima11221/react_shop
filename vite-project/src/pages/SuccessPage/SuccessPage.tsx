import {Link} from "react-router-dom";
import style from "./style.module.scss"

const SuccessPage = () => {

	return (
		<div className={style.successWrapper}>
			<h2 className={style.headerTitle}>Заказ успешно оформлен!</h2>
			<Link to='/' className={style.checkoutButton}>Вернуться в магазин</Link>
		</div>
	)
}

export { SuccessPage };