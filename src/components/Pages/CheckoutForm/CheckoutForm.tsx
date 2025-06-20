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

type IPayment = 'sbp' | 'card' | 'crypto';

const PaymentIcons = {
	sbp: '🟢',
	card: '💳',
	crypto: '₿',
};

const PaymentMethods: {
	value: IPayment;
	label: string;
	icon: string;
}[] = [
	{value: 'sbp', label: 'СБП', icon: PaymentIcons.sbp},
	{value: 'card', label: 'Картой онлайн', icon: PaymentIcons.card},
	{value: 'crypto', label: 'Криптовалютой', icon: PaymentIcons.crypto},
];


const CheckoutForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { customerData, order, formErrors } =  useSelector((state: RootState) => state.shop);
	const total = order.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
	const [burger, setBurger] = useState(false);
	const [showPaymentOptions, setShowPaymentOptions] = useState(false);
	const navigate =  useNavigate();

	const goBack = () => {
		navigate(-1);
		dispatch(clearFormErrors())
	}

	const handleSetBurger = () => {
		setBurger(!burger);
	}

	const togglePaymentOptions = () => {
		setShowPaymentOptions(!showPaymentOptions);
	}

	const handlePaymentSelect = (value: IPayment) => {
		dispatch(updateCustomersData({
			...customerData,
			paymentMethod: value,
		}))

		setShowPaymentOptions(false);
	}

	// console.log(order[0])
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		dispatch(submitOrder())
			.unwrap()
			.then(({totalCost}) => {
				alert(`Заказ #${Date.now()} оформлен! Сумма: ${totalCost} V-Bucks.`)
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
		<div className={style.checkoutWrapper} onClick={() => setShowPaymentOptions(false)}>
			<div className={style.checkoutContainer}>
				<div className={style.checkoutHeader}>
					<h2 className={style.headerTitle}>Оформление заказа</h2>
				</div>

				<form className={style.checkoutForm} onSubmit={handleSubmit}>
					<div className={style.formSection}>
						<h3 className={style.sectionTitle}>1. Данные покупателя</h3>

						<div className={style.inputGroup}>
							<label className={style.inputLabel}>Имя:</label>
							<input
								type="text"
								name="name"
								placeholder="Иван"
								value={customerData.name}
								onChange={handleChange}
								className={`${style.formInput} ${formErrors.name ? style.inputError : ''}`}
							/>
							{formErrors.name && <span className={style.errorMessage}>{formErrors.name}</span>}
						</div>

						<div className={style.inputGroup}>
							<label className={style.inputLabel}>Email:</label>
							<input
								type="email"
								name="email"
								placeholder="example@mail.ru"
								value={customerData.email}
								onChange={handleChange}
								className={`${style.formInput} ${formErrors.email ? style.inputError : ''}`}
							/>
							{formErrors.email && <span className={style.errorMessage}>{formErrors.email}</span>}
						</div>

						<div className={style.inputGroup}>
							<label className={style.inputLabel}>Телефон:</label>
							<input
								type="tel"
								name="phone"
								placeholder="+7..."
								value={customerData.phone}
								onChange={handlePhoneNumber}
								className={`${style.formInput} ${formErrors.phone ? style.inputError : ''}`}
							/>
							{formErrors.phone && <span className={style.errorMessage}>{formErrors.phone}</span>}
						</div>

						<div className={style.inputGroup}>
							<label className={style.inputLabel}>Логин аккаунта:</label>
							<input
								type="text"
								name="accName"
								placeholder="Логин с Epic Games"
								value={customerData.accName}
								onChange={handleChange}
								className={`${style.formInput} ${formErrors.accName ? style.inputError : ''}`}
							/>
							{formErrors.accName && <span className={style.errorMessage}>{formErrors.accName}</span>}
						</div>
					</div>

					<div className={style.formSection}>
						<h3 className={style.sectionTitle}>2. Способ оплаты</h3>
						<div className={style.inputGroup}>
							<label className={style.inputLabel}>Способ оплаты:</label>


							<div className={style.customSelect} onClick={(e) => e.stopPropagation()}>
								<div
									className={`${style.selectHeader} ${formErrors.paymentMethod ? style.inputError : ''}`}
									onClick={togglePaymentOptions}
								>
									{customerData.paymentMethod === 'empty' && (
										<div className={style.selectedOption}>
											<span className={style.paymentPlaceholder}>
												Выберите способ оплаты
											</span>
										</div>
									)}
									{customerData.paymentMethod && (
										<div className={style.selectedOption}>
											<span className={style.paymentIcon}>
												{PaymentMethods.find(method => method.value === customerData.paymentMethod)?.icon}
											</span>
											{PaymentMethods.find(method => method.value === customerData.paymentMethod)?.label}
										</div>
									)}
									<span className={style.arrowIcon}>{showPaymentOptions ? '▲' : '▼'}</span>
								</div>

								{showPaymentOptions && (
									<div className={style.selectOptions}>
										{PaymentMethods.map((method) => (
											<div
												key={method.value}
												className={style.optionItem}
												onClick={() => handlePaymentSelect(method.value)}
											>
												<span className={style.paymentIcon}>{method.icon}</span>
												{method.label}
											</div>
										))}
									</div>
								)}
							</div>



							{/*<select*/}
							{/*	name="paymentMethod"*/}
							{/*	onChange={handleChange}*/}
							{/*	className={`${style.formSelect} ${formErrors.paymentMethod ? style.inputError : ''}`}*/}
							{/*	value={customerData.paymentMethod}*/}
							{/*>*/}
							{/*	<option value="">Выберите способ оплаты</option>*/}
							{/*	<option value="sbp">СБП</option>*/}
							{/*	<option value="card">Картой онлайн</option>*/}
							{/*	<option value="crypto">Криптовалюта (USDT, BTC)</option>*/}
							{/*</select>*/}
							{formErrors.paymentMethod && <span className={style.errorMessage}>{formErrors.paymentMethod}</span>}
						</div>
					</div>

					<div className={style.formSection}>
						<div className={style.itemsHeader}>
							<h3 className={style.sectionTitle}>3. Список покупок</h3>
							<button
								type="button"
								onClick={handleSetBurger}
								className={style.toggleButton}
							>
								{burger ? 'Свернуть' : 'Развернуть'}
							</button>
						</div>

						{burger && (
							<div className={style.itemsList}>
								{order.map((item, index) => (
									<div key={item.id} className={style.itemsFlex}>
										<div className={style.itemRow}>
											<span className={style.itemNumber}>{index + 1}.</span>
											<span className={style.itemName}>{item.name} ({item.quantity}шт.)</span>
										</div>
										<span className={style.itemPrice}>{item.finalPrice * item.quantity} V-Bucks</span>
									</div>
								))}
							</div>
						)}
					</div>

					<div className={style.totalSection}>
						<div className={style.totalAmount}>Итого: {total} V-Bucks</div>
						<div className={style.buttonsGroup}>
							<button type="button" onClick={goBack} className={`${style.button} ${style.backButton}`}>
								Назад
							</button>
							<button type="submit" className={`${style.buyButton} ${style.submitButton}`}>
								Подтвердить заказ
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export { CheckoutForm }