import { Router } from 'express';
import productController from '../controllers/product.controller';
import validateProduct from '../middlewares/validateNewProducts';

const router = Router();

router.post('/', validateProduct, productController.create);

export default router;
