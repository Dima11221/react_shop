import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {closeCheckout, resetOrderState, updateCustomersData} from "../../store/reducers/shopSlice.ts";
import {ICheckoutFormItem} from "../../types/Types.ts";

import style from './style.module.scss'
import closeModalIcon from "../../icons/closeModalIcon.svg";
import * as React from "react";
import {useState} from "react";

const CheckoutForm = () => {
	const dispatch = useDispatch();
	const { customerData, order } =  useSelector((state: RootState) => state.shop);
	const totalCost = order.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
	const [error, setError] = useState<ICheckoutFormItem>({});

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

		setError(newError);
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
									className={error.name && style.isError}
									required
								/>
							</div>
							{
								error.name && <span className={style.errorText}>{error.name}</span>
							}
							<div>
								<label>Email: </label>
								<input
									type="email"
									name="email"
									placeholder={'example@mail.ru'}
									value={customerData.email}
									onChange={handleChange}
									className={error.email && style.isError}
									required
								/>
							</div>
							{
								error.email && <span className={style.errorText}>{error.email}</span>
							}
							<div>
								<label>Телефон: </label>
								<input
									type="tel"
									name="phone"
									placeholder={'+7...'}
									value={customerData.phone}
									onChange={handlePhoneNumber}
									className={error.phone && style.isError}
									required
								/>
							</div>
							{
								error.phone && <span className={style.errorText}>{error.phone}</span>
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
									className={error.accName && style.isError}
									required
								/>
							</div>
							{
								error.accName && <span className={style.errorText}>{error.accName}</span>
							}
							<div>
								<label>Способ оплаты: </label>
								<select name='paymentMethod' onChange={handleChange}>
									<option value='empty'>...</option>
									<option value='sbp'>СБП</option>
									<option value='card'>Картой онлайн</option>
									<option value='crypto'>Криптовалюта (USDT, BTC)</option>
								</select>
							</div>
							{
								error.paymentMethod && <span className={style.errorText}>{error.paymentMethod}</span>
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