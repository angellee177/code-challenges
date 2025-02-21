import { Request, Response } from 'express';
import { CategoriesService } from '../services/category.service';
import { successResponse, errorResponse } from '../common/response.helper';

export class CategoryController {
    constructor(private readonly categoryService: CategoriesService) {}

    /**
     * Create a new category
     */
    async createCategory(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const category = await this.categoryService.create(name);

            res.status(201).json(successResponse('Category successfully created', category));
        } catch (error: any) {
            res.status(400).json(errorResponse('Failed to create category', error.message));
        }
    }

    /**
     * Get all categories with pagination
     */
    async getAllCategories(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 25;

            const categories = await this.categoryService.getAll(page, limit);
            res.status(200).json(successResponse('Categories fetched successfully', categories));
        } catch (error: any) {
            res.status(500).json(errorResponse('Failed to fetch categories', error.message));
        }
    }

    /**
     * Get a category by ID
     */
    async getCategoryById(req: Request, res: Response) {
        try {
            const category = await this.categoryService.getOne(req.params.id);

            res.status(200).json(successResponse('Category fetched successfully', category));
        } catch (error: any) {
            res.status(404).json(errorResponse('Failed to fetch category', error.message));
        }
    }

    /**
     * Update a category by ID
     */
    async updateCategory(req: Request, res: Response) {
        try {
            const updatedCategory = await this.categoryService.update(req.params.id, req.body);
            res.status(200).json(successResponse('Category updated successfully', updatedCategory));
        } catch (error: any) {
            res.status(400).json(errorResponse('Failed to update category', error.message));
        }
    }

    /**
     * Delete a category by ID
     */
    async deleteCategory(req: Request, res: Response) {
        try {
            await this.categoryService.delete(req.params.id);
            res.status(200).json(successResponse('Category deleted successfully'));
        } catch (error: any) {
            res.status(400).json(errorResponse('Failed to delete category', error.message));
        }
    }
}
