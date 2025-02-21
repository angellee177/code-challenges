import { IsNull, Repository } from 'typeorm';
import { Category } from '../models/Category.entity';
import { setLog } from '../common/logger.helper';
import { connectionSource } from '../config/typeorm';

export class CategoriesService {
    private categoryRepository: Repository<Category>;

    constructor(categoryRepository: Repository<Category> = connectionSource.getRepository(Category)) {
        this.categoryRepository = categoryRepository;
    }

    /**
     * Create new Category
     * 
     * @param category 
     * @returns 
     */
    async create(name: string): Promise<Category> {
        try {
            setLog({ 
                level: 'info', 
                method: 'CategoriesService.create', 
                message: `Creating category with name: ${name}` 
            });
    
            // 👉 Create a new Category instance
            const category = this.categoryRepository.create({ name });
    
            const savedCategory = await this.categoryRepository.save(category);
    
            setLog({ 
                level: 'info', 
                method: 'CategoriesService.create', 
                message: `Category created successfully: ${savedCategory.name}` 
            });
    
            return savedCategory;
        } catch (error) {
            setLog({ 
                level: 'error', 
                method: 'CategoriesService.create', 
                message: 'Error while creating category',
                error: error as Error,
            });
    
            throw error;
        }
    }
    
    /**
     * Fetch all Categories
     * 
     * @param page 
     * @param limit 
     * @returns 
     */
    async getAll(page: number = 1, limit: number = 25) {
        const [categories, total] = await this.categoryRepository.findAndCount({
            where: { deletedAt: IsNull() },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data: categories.map(category => ({
                id: category.id,
                name: category.name,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            })),
            meta: { total, page, limit },
        };
    }

    /**
     * Get single Category
     * 
     * @param id 
     * @returns 
     */
    async getOne(id: string): Promise<Category> {
        try {
            setLog({ 
                level: 'info', 
                method: 'CategoriesService.getOne', 
                message: `Fetching category with ID: ${id}` 
            });

            const category = await this.categoryRepository.findOne({ where: { id, deletedAt: IsNull() } });

            if (!category) throw Error(`Category with ID ${id} not found`);

            return category;
        } catch (err) {
            setLog({ 
                level: 'error', 
                method: 'CategoriesService.getOne', 
                message: 'Error while fetching category', 
                error: err as Error 
            });

            throw err;
        }
    }

    /**
     * Update a single category
     * @param id 
     * @param category 
     * @returns 
     */
    async update(id: string, category: Partial<Category>): Promise<Category> {
        try {
            setLog({ 
                level: 'info', 
                method: 'CategoriesService.update', 
                message: `Updating category with ID: ${id}` 
            });

            const result = await this.categoryRepository.update(id, category);
            if (result.affected === 0) throw new Error('Category not found');

            const updatedCategory = await this.categoryRepository.findOne({ 
                where: { id, deletedAt: IsNull() } 
            });

            if (!updatedCategory) throw new Error('Category not found');

            setLog({ 
                level: 'info', 
                method: 'CategoriesService.update', 
                message: `Category updated successfully: ${updatedCategory.id}` 
            });

            return updatedCategory;
        } catch (err) {
            setLog({ 
                level: 'error', 
                method: 'CategoriesService.update', 
                message: 'Error while updating category', 
                error: err as Error 
            });

            throw err;
        }
    }

    /**
     * Delete single Category
     * 
     * @param id 
     */
    async delete(id: string): Promise<void> {
        try {
            setLog({ 
                level: 'info', 
                method: 'CategoriesService.delete', 
                message: `Soft deleting category with ID: ${id}` 
            });

            const result = await this.categoryRepository.update(
                id, 
                { deletedAt: new Date() }
            );

            if (result.affected === 0) throw new Error('Category not found');

            setLog({
                level: 'info', 
                method: 'CategoriesService.delete', 
                message: `Category soft deleted successfully: ${id}` 
            });
        } catch (error) {
            setLog({ 
                level: 'error', 
                method: 'CategoriesService.delete', 
                message: 'Error while soft deleting category', 
                error: error as Error 
            });

            throw error;
        }
    }
}
