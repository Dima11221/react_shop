import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node"

const app = express();


const allowedOrigins = [
    "http://localhost:5173",
    "https://dima11221.github.io",
    "https://react-shop-backend-672m.onrender.com"
]

app.use(cors({
    origin: function (origin,  callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS!"));
        }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

// app.options('*', cors())

app.use(bodyParser.json());


const adapter = new JSONFile('orders.json');
const defaultData = { orders: [] };
const db = new Low(adapter, defaultData);


async function initDB() {
    try {
        await db.read();

        if (!db.data || !db.data.orders) {
            db.data ||= defaultData;
            // db.data = db.data || defaultData;
            await db.write();
        }
        console.log('База данных готова',  db.data);
    } catch (error) {
        console.log("Ошибка инициализации DB", error);
        process.exit(1);
    }
}

app.post('/api/orders',  async (req, res) => {
    try {
        await db.read();

        const order = {
            id: Date.now().toString(),
            ...req.body,
            createdAt: new Date().toISOString(),
        };

        db.data.orders.push(order);
        await db.write();

        console.log("Новый заказ:",  order);

        res.status(201).json({
            success: true,
            orderId: order.id
        });

    } catch (error) {
        console.error("Ошибка", error);
        res.status(500).json({
            success: false,
            error: "Ошибка сервера"
        })
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        await db.read();
        res.json(db.data.orders);
    } catch (error) {
        res.status(500).json({
            error: "Ошибка чтения данных"
        });
    }
});

const PORT = 3001;

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
})
