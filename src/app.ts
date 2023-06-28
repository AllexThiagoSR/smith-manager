import express from 'express';
import productRouter from './routers/product.routes';
import orderRouter from './routers/order.routes';
import userController from './controllers/user.controller';
import validateLogin from './middlewares/validateLogin';

const app = express();

app.use(express.json());

app.use('/products', productRouter);

app.use('/orders', orderRouter);

app.post('/login', validateLogin, userController.login);

export default app;
