import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store.ts";
import {
	clearFormErrors,
	resetOrderState,
	updateCustomersData
} from "../../../store/reducers/shopSlice.ts";

import style from './style.module.scss'
import * as React from "react";
import {submitOrder} from "../../../store/reducers/thunk.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const CheckoutForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { customerData, order, formErrors } =  useSelector((state: RootState) => state.shop);
	const total = order.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
	const [burger, setBurger] = useState(false);
	const navigate =  useNavigate();

	const goBack = () => {
		navigate(-1);
		dispatch(clearFormErrors())
	}

	const handleSetBurger = () => {
		setBurger(!burger);
	}

	// console.log(order[0])
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		dispatch(submitOrder())
			.unwrap()
			.then(({totalCost}) => {
				alert(`Заказ #${Date.now()} оформлен! Сумма: ${totalCost} руб.`)
		})
			.then(() => {
			dispatch(resetOrderState());
		})
			.catch(() => {})

	};


	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { value, name } = event.target;
		dispatch(updateCustomersData({
			...customerData,
			[name]: value}))
	}

	const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;
		const phoneValue = input.replace(/[^\d+()-]/g, '');
		dispatch(updateCustomersData({
			...customerData,
			phone: phoneValue,
		}))
	}

	return (
		<div className={style.checkoutWrapperPos}>
			<div className={style.checkoutWrapperStyle}>
				<div className={`${style.cartWrapper} ${style.cartWrapperStyle} ${style.flex}`}>
					<h2>Оформление заказа</h2>
				</div>

				<form id="checkoutForm" >
					<div className={`${style.flexColumn} ${style.listStyle} ${style.WrapperForm}`}>
						<h2 className={style.formTitle}>1. Данные покупателя</h2>
						<div className={style.userInfo}>
							<div className={`${style.formItem} ${style.flexRow}`}>
								<label>Имя: </label>
								<input
									type="text"
									name="name"
									placeholder={'Иван'}
									value={customerData.name}
									onChange={handleChange}
									className={formErrors.name && style.isError}
									required
								/>
								{
									formErrors.name && <p className={style.errorText}>{formErrors.name}</p>
								}
							</div>
							<div className={`${style.formItem} ${style.flexRow}`}>
								<label>Email: </label>
								<input
									type="email"
									name="email"
									placeholder={'example@mail.ru'}
									value={customerData.email}
									onChange={handleChange}
									className={formErrors.email && style.isError}
									required
								/>
								{
									formErrors.email && <p className={style.errorText}>{formErrors.email}</p>
								}
							</div>
							<div className={`${style.formItem} ${style.flexRow}`}>
								<label>Телефон: </label>
								<input
									type="tel"
									name="phone"
									placeholder={'+7...'}
									value={customerData.phone}
									onChange={handlePhoneNumber}
									className={formErrors.phone && style.isError}
									required
								/>
								{
									formErrors.phone && <p className={style.errorText}>{formErrors.phone}</p>
								}
							</div>
							<div className={`${style.formItem} ${style.flexRow}`}>
								<label>Логин аккаунта: </label>
								<input
									type="text"
									name="accName"
									placeholder={'Логин с Epic Games'}
									value={customerData.accName}
									onChange={handleChange}
									className={formErrors.accName && style.isError}
									required
								/>
								{
									formErrors.accName && <p className={style.errorText}>{formErrors.accName}</p>
								}
							</div>
						</div>
						<h2 className={style.formTitle}>2. Выберите способ оплаты</h2>
						<div className={style.userInfo}>
							<div className={`${style.formItem} ${style.flexRow}`}>
								<label>Способ оплаты: </label>
								<select name='paymentMethod' onChange={handleChange} className={formErrors.paymentMethod && style.isError}>
									<option value='empty'>...</option>
									<option value='sbp'>СБП</option>
									<option value='card'>Картой онлайн</option>
									<option value='crypto'>Криптовалюта (USDT, BTC)</option>
								</select>
								{
									formErrors.paymentMethod && <p className={style.errorText}>{formErrors.paymentMethod}</p>
								}
							</div>
							<h2 className={style.formTitle}>3. Список покупок</h2>
							<button onClick={handleSetBurger}>СПИСОК</button>
							{!burger && (
								<div className={style.checkoutList}>
									{order.map((item, index) => (
											<div>
												<h3>№ {index + 1}</h3>
												<div className={style.flexColumn}>
													<h4>Товар: {item.name}</h4>
													<h4>Цена: {item.finalPrice} руб.</h4>
													<h4>Сколько: {item.quantity}</h4>
												</div>
											</div>

										)
									)}
								</div>
							)}


							<h2 className={style.finalCost}>
								Итого к оплате: {total}
							</h2>
						</div>
					</div>
					<div className={`${style.submitButton} ${style.cartWrapperStyle} ${style.flex}`}>
						<button type='submit' className={`${style.btnReset} ${style.btn}`} onClick={handleSubmit}>Подтвердить заказ</button>
						<button onClick={goBack} className={`${style.btnReset} ${style.btn}`}>Назад</button>
					</div>
				</form>
			</div>
		</div>


	)
}

export { CheckoutForm }