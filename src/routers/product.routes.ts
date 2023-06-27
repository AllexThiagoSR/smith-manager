import { Router } from 'express';
import productController from '../controllers/product.controller';
import validateProduct from '../middlewares/validateNewProducts';

const router = Router();

router.post('/', validateProduct, productController.create);

router.get('/', productController.getAll);

export default router;
