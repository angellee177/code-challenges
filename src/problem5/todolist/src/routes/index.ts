import { Router } from 'express';
import categoryRouter from './category.routes';
import taskRouter from './task.routes';

const router = Router();

router.use('/categories/v1', categoryRouter);
router.use('/tasks/v1', taskRouter);

export default router;
