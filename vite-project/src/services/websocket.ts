import { GOODS_WS_URL } from '../config.ts';
import {IWebSocketMessage} from "../shared/types/Types.ts";

export const createGoodsWebSocket = () => {
	let socket: WebSocket | null = null;
	let reconnectAttempt = 0;
	const maxReconnectAttempts = 5;
	const reconnectDelay = 3000;
	let listeners: Array<(data: IWebSocketMessage) => void> = [];

	const connect = () => {
		socket = new WebSocket(GOODS_WS_URL);

		socket.onopen = () => {
			console.log('WebSocket connected to:', GOODS_WS_URL);
			reconnectAttempt = 0;
			if (socket) socket.send(JSON.stringify({ type: 'REQUEST_GOODS' }));
		};

		socket.onmessage = (event) => {
			try {
				const message = JSON.parse(event.data);
				listeners.forEach(listener =>
					listener(message))
			} catch (error) {
				console.error('Error parsing WebSocket message: ', error);
			}
		};

		socket.onclose = () => {
			console.log('Disconnected');
			if (reconnectAttempt < maxReconnectAttempts) {
				setTimeout(() => {
					reconnectAttempt++;
					console.log(`Reconnecting attempt ${reconnectAttempt}`);
					connect();
				}, reconnectDelay);
			}
		};

		socket.onerror = (error) => {
			console.error('Error parsing WebSocket: ', error);
		};
	}
	const addListener = (listner: (data: IWebSocketMessage) => void) => {
		listeners.push(listner);
		return () => {
			listeners = listeners.filter((listener) => listener !== listener);
		};
	};

	const close = () => {
		if (socket) {
			socket.close();
		}
	};

	connect();

	return {
		addListener,
		close,
	}
}

export const goodsWebSocket = createGoodsWebSocket();