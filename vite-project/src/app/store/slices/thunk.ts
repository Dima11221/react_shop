import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_BACKEND_URL, API_KEY, API_URL} from "../../../config.ts";
import {ICheckoutFormItem, IGoodsItemProp} from "../../../shared/types/Types.ts";
import {IShopState, setFormErrors} from "./shopSlice.ts";
import {goodsWebSocket} from "../../../services/websocket.ts";


export const fetchGoods =  createAsyncThunk<IGoodsItemProp[], void>(
	"shop/fetchGoods",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(API_URL, {
				headers: {
					'Authorization': API_KEY
				}
			});
			if (!response.ok) {
				// throw new Error("Server error!");
				return rejectWithValue('Nothing was found.');
			}
			const data = await response.json();
			return data.shop as IGoodsItemProp[];
		} catch (error) {
			console.log(error)
			return rejectWithValue('Network error');
		}
	}
);

export const submitOrder = createAsyncThunk<
	// { totalCost: number },
	{ success: boolean; orderId: string },
	void,
	{
		state: {shop: IShopState };
		rejectWithValue: {message: string};
	}
>(
	"shop/submitOrder",
	async (_, { getState, dispatch, rejectWithValue }) => {
		const { shop } = getState();
		const { customerData, order } = shop;

		const errors: ICheckoutFormItem = {};
		let isValid = true;
		// const newError = {name: '', email: '', phone: '', accName: '', paymentMethod: ''};
		const validNumber = /^(\+7|7|8)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(customerData.phone);
		// const validCardNumber = /^[0-9]{4}[- ]?[0-9]{4}[- ]?[0-9]{4}[- ]?[0-9]{4}$/.test(customerData.cardNumber);
		const totalCost = order.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);

		if (!customerData.name.trim()) {
			errors.name = 'Введите имя!'
			isValid = false;
		}

		if (!customerData.email.includes('@')) {
			errors.email = 'Некорректная почта!';
			isValid = false;
		}

		if (!validNumber) {
			errors.phone = 'Некорректный номер телефона!';
			isValid = false;
		}

		if (!customerData.accName.trim()) {
			errors.accName = 'Введите ваш логин!';
			isValid = false;
		}
		if (customerData.paymentMethod === 'empty') {
			errors.paymentMethod = 'Не выбран способ оплаты!';
			isValid = false;
		}
		if (!customerData.paymentInput) {
			errors.paymentInput = 'Введите данные способа оплаты!'
		}

		dispatch(setFormErrors(errors))

		if (!isValid) {
			// dispatch(setFormErrors(errors))
			return rejectWithValue({message: "Ошибка валидации!"});
		}



		const orderData = {
			customer: {
				name: customerData.name,
				email: customerData.email,
				phone: customerData.phone,
				account: customerData.accName,
			},
			payment: customerData.paymentMethod,
			paymentInfo: customerData.paymentInput,
			items: order.map((item) => {
				return {
					id: item.id,
					name: item.name,
					price: item.finalPrice,
					quantity: item.quantity,
				}
			}),
			total: totalCost,
			date: new Date().toLocaleDateString(),
		}

		console.log("Данные для отправки:", orderData );


		try {
			const response = await fetch(`${API_BACKEND_URL}/api/orders`, {
			// const response = await fetch(`http://localhost:3001/api/orders`, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData)
			});
			if (!response.ok) {
				throw new Error('Ошибка сервера');
			}
			return await response.json();

		}  catch (error) {
			console.log(`Не удалось отправить заказ. Ошибка ${error}`)
			return rejectWithValue({
				message: error instanceof Error && error.message,
			});
		}

	}
);

export const setupGoodsListener = createAsyncThunk<IGoodsItemProp[], void>(
	"shop/setupGoodsListener",
	async (_, {rejectWithValue}) => {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				removeListener();
				reject(rejectWithValue('Connection timeout'));
			}, 5000);

			const removeListener = goodsWebSocket.addListener((message) => {
				if (message.type === "GOODS_UPDATE") {
					clearTimeout(timeout);
					removeListener();
					resolve(message.data);
				}
			})
		})
	}
)