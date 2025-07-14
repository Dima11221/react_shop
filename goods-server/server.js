import express from 'express';
import { WebSocketServer } from 'ws';
import axios from "axios";
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
import { API_URL } from './server-config.js';

const app = express();
const PORT = process.env.PORT || 3002;

const FORTNITE_API_URL = API_URL;
const API_KEY = process.env.FORTNITE_API_KEY;

let goods = []
let clients = new Set();

app.use(express.json());
app.use(cors());


const fetchGoods = async () => {
    try {
        console.log('Запрашиваю товары с Fortnite API...');
        const response = await axios.get(FORTNITE_API_URL, {
            headers: {'Authorization': API_KEY.trim()}
        });

        if (!response.data?.shop) {
            throw new Error('Некорректный ответ от API');
        }

        goods = response.data.shop;
        console.log('Получено товаров:', goods.length);
        console.log('Пример товара:', goods[0]?.displayName);
        broadcastGoods();
        return goods;
    }  catch (error) {
        console.error('Ошибка загрузки товаров: ',error.message);
        console.error('Полный ответ ошибки:', error.response?.data);
        throw error;
    }
}

const broadcastGoods = () => {
    console.log('Broadcasting goods:', goods.length);
    const message = JSON.stringify({
        type: "GOODS_UPDATE",
        data: goods
    });

    console.log('Clients to notify:', clients.size);
    clients.forEach(client => {
        if (client.readyState === clients.OPEN) {
            client.send(message);
        }
    });
}

const server = app.listen(PORT, () => {
    console.log(`Клиент запущен на порту ${PORT}`);
    fetchGoods();
    setInterval(fetchGoods, 30*60*1000);
});

const wsServer = new WebSocketServer({server});

wsServer.on('connection', (ws) => {
    console.log('Новое WebSocket подключение');
    clients.add(ws);

    if (goods.length > 0) {
        ws.send(JSON.stringify({
            type: 'GOODS_UPDATE',
            data: goods
        }));
    }

    ws.on('message', (message) => {
        try {
            const parsed = JSON.parse(message);
            if (parsed.type === 'REQUEST_GOODS' && goods.length > 0) {
                ws.send(JSON.stringify({
                    type: 'GOODS_UPDATE',
                    data: goods
                }));
            }
        } catch (e) {
            console.error('Error parsing message:', e);
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
    })
})

app.get('/', (req, res) => {
    res.send('Fortnite Shop Server is running!');
});

app.get('/api/goods', (req, res) => {
    res.json({
        success: true,
        goods: goods
    });
});

app.get('/api/refresh-goods', async (req, res) => {
    try {
        const updatedGoods = await fetchGoods();
        res.json({
            success: true,
            message: 'Товары обновлены',
            goods: updatedGoods
        });
    }  catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            goods: []
        });
    }
})