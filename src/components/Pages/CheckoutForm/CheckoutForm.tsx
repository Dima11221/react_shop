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

const CheckoutForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { customerData, order, formErrors } =  useSelector((state: RootState) => state.shop);
	const total = order.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
	const navigate =  useNavigate();

	const goBack = () => {
		navigate(-1);
		dispatch(clearFormErrors())
	}

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
			<button onClick={goBack} className={`${style.btnReset} ${style.btn} ${style.btnPos}`}>Назад</button>
			<div className={style.checkoutWrapperStyle}>
				<div className={`${style.cartWrapper} ${style.cartWrapperStyle} ${style.flex}`}>
					<h2>Оформление заказа</h2>
				</div>

				<form id="checkoutForm" >
					<div className={`${style.flex} ${style.listStyle} ${style.WrapperForm}`}>
						<div className={style.formItems}>
							<div>
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
							</div>
							{
								formErrors.name && <p className={style.errorText}>{formErrors.name}</p>
							}
							<div>
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
							</div>
							{
								formErrors.email && <p className={style.errorText}>{formErrors.email}</p>
							}
							<div>
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
							</div>
							{
								formErrors.phone && <p className={style.errorText}>{formErrors.phone}</p>
							}
						</div>
						<div className={style.formItems}>
							<div>
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
							</div>
							{
								formErrors.accName && <p className={style.errorText}>{formErrors.accName}</p>
							}
							<div>
								<label>Способ оплаты: </label>
								<select name='paymentMethod' onChange={handleChange} className={formErrors.paymentMethod && style.isError}>
									<option value='empty'>...</option>
									<option value='sbp'>СБП</option>
									<option value='card'>Картой онлайн</option>
									<option value='crypto'>Криптовалюта (USDT, BTC)</option>
								</select>
							</div>
							{
								formErrors.paymentMethod && <p className={style.errorText}>{formErrors.paymentMethod}</p>
							}
							<h3>
								Итого к оплате: {total}
							</h3>
						</div>
					</div>
					<div className={`${style.cartWrapper} ${style.cartWrapperStyle} ${style.flex}`}>
						<button type='submit' onClick={handleSubmit}>Подтвердить заказ</button>
					</div>
				</form>
			</div>
		</div>


	)
}

export { CheckoutForm }