import { Router } from 'express';
import { getHabits, createHabit, updateHabit, deleteHabit } from '../controllers/habitController';

const router = Router();

router.get('/', getHabits);
router.post('/', createHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

export default router;
