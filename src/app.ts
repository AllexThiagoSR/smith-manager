import express from 'express';
import productRouter from './routers/product.routes';
import orderRouter from './routers/order.routes';

const app = express();

app.use(express.json());

app.use('/products', productRouter);

app.use('/orders', orderRouter);

export default app;
