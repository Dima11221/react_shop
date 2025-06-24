// import {Transporter} from 'nodemailer';
import {createTransport} from "nodemailer";



const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: 'fortniteshop524@gmail.com',
        pass: 'rxid bnns jluf dhxz',
    }
});

export const sendOrderMail = async (
    customerEmail,
    customerName,
    orderId,
    orderTotal
) => {
    console.log("Начинаю отправку письма...");
    try {
        const  mailOptions = {
            from: "'Магазин Fortnite Shop' <shop.vbucks@gmail.com>" ,
            to: customerEmail,
            subject: `Ваш заказ #${orderId}`,
            html: `
		<h1>Уважаемый(ая) ${customerName}, спасибо за заказ!</h1>
		<p><strong>Номер заказа:</strong>${orderId}</p>
		<p><strong>Сумма заказа:</strong>${orderTotal}V-Bucks</p>
		<p>Товары будут переведены на ваш аккаунт в течение 24 часов.</p>
		`
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Текст письма: ", info);
        return true;
    } catch (error) {
        console.error("Ошибка отправки",error);
        throw  error;
    }

};