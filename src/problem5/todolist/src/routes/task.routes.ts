// routes/task.routes.ts
import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';
import { validateRequest } from '../common/validation.helper';
import { body, param, query } from 'express-validator';

const taskRouter = Router();
const taskController = new TaskController(new TaskService());

// Create Task
taskRouter.post(
    '/new',
    [
        body('title').isString().notEmpty().withMessage('Title is required'),
        body('description').optional().isString().withMessage('Description must be a string'),
        body('status').optional().isIn(['Pending', 'InProgress', 'Completed']).withMessage('Invalid status'),
        body('categoryId').isUUID().withMessage('Invalid category ID')
    ],
    validateRequest,
    taskController.createTask.bind(taskController)
);

// Get All Tasks with Pagination
taskRouter.get(
    '/',
    [
        query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
        query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer')
    ],
    validateRequest,
    taskController.getAllTasks.bind(taskController)
);

// Get Task by ID
taskRouter.get(
    '/:id',
    [param('id').isUUID().withMessage('Invalid task ID')],
    validateRequest,
    taskController.getTaskById.bind(taskController)
);

// Update Task
taskRouter.put(
    '/update/:id',
    [
        param('id').isUUID().withMessage('Invalid task ID'),
        body('title').optional().isString().withMessage('Title must be a string'),
        body('description').optional().isString().withMessage('Description must be a string'),
        body('status').optional().isIn(['Pending', 'InProgress', 'Completed']).withMessage('Invalid status'),
        body('categoryId').optional().isUUID().withMessage('Invalid category ID')
    ],
    validateRequest,
    taskController.updateTask.bind(taskController)
);

// Delete Task
taskRouter.delete(
    '/delete/:id',
    [param('id').isUUID().withMessage('Invalid task ID')],
    validateRequest,
    taskController.deleteTask.bind(taskController)
);

export default taskRouter;
