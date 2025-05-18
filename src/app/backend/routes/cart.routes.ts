import { Router } from 'express';
import * as cartController from '../controllers/cart.controller';

const router = Router();

router.get('/', cartController.getCart);
router.post('/', cartController.addItem);
router.put('/', cartController.updateItem);
router.delete('/:id', cartController.removeItem);
router.delete('/', cartController.clearCartItems);

export default router;
