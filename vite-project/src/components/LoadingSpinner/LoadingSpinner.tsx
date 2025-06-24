import style from "./style.module.scss"

const LoadingSpinner = () => {

	return (
		<div className={style.spinner}>
			<div className={style.dotBefore}></div>
			<div className={style.dotAfter}></div>
		</div>
	)
}

export { LoadingSpinner }