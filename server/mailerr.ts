// import {Transporter} from 'nodemailer';
// import {createTransport} from "nodemailer";
//
// interface MailOptions {
// 	to: string;
// 	from: string;
// 	subject: string;
// 	html: string;
// }
//
// const transporter: Transporter = createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: 'fortniteshop524@gmail.com',
// 		pass: 'rxid bnns jluf dhxz',
// 	}
// });
//
// export const sendOrderMail = async (
// 	customerEmail: string,
// 	customerName: string,
// 	orderId: string,
// 	orderTotal: number
// ): Promise<void> => {
// 	const  mailOptions: MailOptions = {
// 		from: "'Магазин Fortnite Shop' <shop.vbucks@gmail.com>" ,
// 		to: customerEmail,
// 		subject: `Ваш заказ #${orderId}`,
// 		html: `
// 		<h1>Уважаемый(ая) ${customerName}, спасибо за заказ!</h1>
// 		<p><strong>Номер заказа:</strong>${orderId}</p>
// 		<p><strong>Сумма заказа:</strong>${orderTotal}V-Bucks</p>
// 		<p>Товары будут переведены на ваш аккаунт в течение 24 часов.</p>
// 		`
// 	};
// 	await transporter.sendMail(mailOptions);
// };