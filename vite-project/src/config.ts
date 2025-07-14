const API_KEY = import.meta.env.VITE_APP_API;

const API_URL = 'https://fortniteapi.io/v2/shop?lang=ru';
const API_BACKEND_URL = 'https://react-shop-backend-672m.onrender.com';
// const GOODS_WS_URL = import.meta.env.VITE_GOODS_WS_URL || 'ws://localhost:3002';
// const GOODS_WS_URL = 'ws://localhost:3002';

const GOODS_WS_URL = import.meta.env.PROD
  ? 'wss://your-render-app.onrender.com'
  : 'ws://localhost:3002';

export {
    API_URL,
    API_KEY,
    API_BACKEND_URL,
    GOODS_WS_URL,
}