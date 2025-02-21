// routes/categoryRoutes.ts
import express from 'express';
import { CategoryController } from '../controllers/category.controller';
import { CategoriesService } from '../services/category.service';
import { validateRequest } from '../common/validation.helper';
import { body, param, query } from 'express-validator';

const categoryRouter = express.Router();
const categoryController = new CategoryController(new CategoriesService());

// Create category
categoryRouter.post(
    '/new',
    body('name').notEmpty().withMessage('Category name is required'),
    validateRequest,
    categoryController.createCategory.bind(categoryController)
);

// Get all categories with pagination
categoryRouter.get(
    '/',
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    validateRequest,
    categoryController.getAllCategories.bind(categoryController)
);

// Get category by ID
categoryRouter.get(
    '/:id',
    param('id').isUUID().withMessage('Invalid category ID'),
    validateRequest,
    categoryController.getCategoryById.bind(categoryController)
);

// Update category by ID
categoryRouter.put(
    '/update/:id',
    param('id').isUUID().withMessage('Invalid category ID'),
    body('name').notEmpty().withMessage('Category name is required'),
    validateRequest,
    categoryController.updateCategory.bind(categoryController)
);

// Delete category by ID
categoryRouter.delete(
    '/delete/:id',
    param('id').isUUID().withMessage('Invalid category ID'),
    validateRequest,
    categoryController.deleteCategory.bind(categoryController)
);

export default categoryRouter;
