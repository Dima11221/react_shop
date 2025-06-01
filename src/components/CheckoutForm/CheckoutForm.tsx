import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {
	closeCheckout,
	resetOrderState,
	setFormErrors,
	updateCustomersData
} from "../../store/reducers/shopSlice.ts";

import style from './style.module.scss'
import closeModalIcon from "../../icons/closeModalIcon.svg";
import * as React from "react";

const CheckoutForm = () => {
	const dispatch = useDispatch();
	const { customerData, order, formErrors } =  useSelector((state: RootState) => state.shop);
	const totalCost = order.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		let isValid = true;
		const newError = {name: '', email: '', phone: '', accName: '', paymentMethod: ''};
		const validNumber = /^(\+7|7|8)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(customerData.phone);

		if (!customerData.name.trim()) {
			newError.name = 'Введите имя!'
			isValid = false;
		}

		if (!customerData.email.includes('@')) {
			newError.email = 'Некорректная почта!';
			isValid = false;
		}

		if (!validNumber) {
			newError.phone = 'Некорректный номер телефона!';
			isValid = false;
		}

		if (!customerData.accName.trim()) {
			newError.accName = 'Введите ваш логин!';
			isValid = false;
		}
		if (customerData.paymentMethod === 'empty') {
			newError.paymentMethod = 'Не выбран способ оплаты!';
			isValid = false;
		}

		dispatch(setFormErrors(newError))
		if (!isValid) {
			return;
		}

		alert(`Заказ оформлен! Сумма: ${totalCost} руб.`);
		dispatch(resetOrderState());
		dispatch(closeCheckout());
	}

	const handleCloseCheckout = () => {
		dispatch(closeCheckout())
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { value, name } = event.target;
		dispatch(updateCustomersData({
			...customerData,
			[name]: value}))
		// console.log(name, value)
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
		<div className={style.cartModalBack} onClick={handleCloseCheckout}>
			<div className={style.checkoutModal} onClick={(e) => e.stopPropagation()}>
				<div className={`${style.cartWrapper} ${style.cartWrapperStyle} ${style.flex}`}>
					<h2>Оформление заказа</h2>
					<button className={style.btnReset} onClick={handleCloseCheckout}>
						<img src={closeModalIcon} className={style.closeModalIcon} alt='closeModalIcon'></img>
					</button>
				</div>

				<form id="checkoutForm" >
					<div className={`${style.flex} ${style.listStyle} ${style.checkoutFormWrapper}`}>
						<div className={style.wrapperItems}>
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
						<div className={style.wrapperItems}>
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
								Итого к оплате: {totalCost}
							</h3>
						</div>
					</div>
					<div className={`${style.cartWrapper} ${style.cartWrapperStyle} ${style.flex}`}>
						<button type='submit' onClick={handleSubmit}>Подтвердить заказ</button>
						<button type='button' onClick={handleCloseCheckout}>Отмена</button>
					</div>
				</form>
			</div>
		</div>


	)
}

export { CheckoutForm }