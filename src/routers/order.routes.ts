import { Router } from 'express';
import orderController from '../controllers/order.controller';
import validateToken from '../middlewares/validateToken';
import validateNewOrder from '../middlewares/validateNewOrder';

const router = Router();

router.get('/', orderController.getAll);

router.post('/', validateToken, validateNewOrder, orderController.create);

export default router;
