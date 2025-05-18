import { Router } from 'express';
import {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const router = Router();

router.post('/', registerUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
