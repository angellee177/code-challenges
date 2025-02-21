import { Repository, IsNull } from 'typeorm';
import { Task } from '../models/Task.entity';
import { setLog } from '../common/logger.helper';
import { connectionSource } from '../config/typeorm';

export class TaskService {
    private taskRepository: Repository<Task>;

    constructor(taskRepository: Repository<Task> = connectionSource.getRepository(Task)) {
        this.taskRepository = taskRepository;
    }

    /**
     * Create a new task.
     * @param task - The task data to be created.
     * @returns The created task.
     */
    async create(task: Task): Promise<Task> {
        try {
            setLog({ level: 'info', method: 'TaskService.create', message: `Creating task: ${task.title}` });
            const savedTask = await this.taskRepository.save(task);
            setLog({ level: 'info', method: 'TaskService.create', message: `Task created successfully: ${savedTask.id}` });
            return savedTask;
        } catch (err: any) {
            setLog({ level: 'error', method: 'TaskService.create', message: 'Error while creating task', error: err });
            throw err;
        }
    }

    /**
     * Get all tasks with pagination.
     * @param page - Page number (default is 1).
     * @param limit - Number of tasks per page (default is 25).
     * @returns A paginated list of tasks.
     */
    async getAll(page: number = 1, limit: number = 25) {
        try {
            setLog({ level: 'info', method: 'TaskService.getAll', message: `Fetching tasks - Page: ${page}, Limit: ${limit}` });
            const [tasks, total] = await this.taskRepository.findAndCount({
                where: { deletedAt: IsNull() },
                skip: (page - 1) * limit,
                take: limit,
                relations: ['category'],
            });

            const result = {
                data: tasks.map(({ id, title, description, status, category, createdAt, updatedAt }) => ({
                    id,
                    title,
                    description,
                    status,
                    category: category ? category.name : null,
                    createdAt,
                    updatedAt,
                })),
                meta: { total, page, limit },
            };

            setLog({ level: 'info', method: 'TaskService.getAll', message: `Tasks fetched successfully - Total: ${total}` });
            return result;
        } catch (err: any) {
            setLog({ level: 'error', method: 'TaskService.getAll', message: 'Error while fetching tasks', error: err });
            throw err;
        }
    }

    /**
     * Get a single task by ID.
     * @param id - The ID of the task to retrieve.
     * @returns The found task.
     */
    async getOne(id: string): Promise<Task> {
        try {
            setLog({ level: 'info', method: 'TaskService.getOne', message: `Fetching task with ID: ${id}` });
            const task = await this.taskRepository.findOne({
                where: { id, deletedAt: IsNull() },
                relations: ['category'],
            });

            if (!task) throw new Error(`Task with ID ${id} not found`);

            setLog({ level: 'info', method: 'TaskService.getOne', message: `Task fetched successfully: ${id}` });
            return task;
        } catch (err: any) {
            setLog({ level: 'error', method: 'TaskService.getOne', message: 'Error while fetching task', error: err });
            throw err;
        }
    }

    /**
     * Update a task by ID.
     * @param id - The ID of the task to update.
     * @param taskData - The partial data to update the task with.
     * @returns The updated task.
     * @throws Error if the task is not found.
     */
    async update(id: string, taskData: Partial<Task>): Promise<Task> {
        try {
            setLog({ level: 'info', method: 'TaskService.update', message: `Updating task with ID: ${id}` });
            const result = await this.taskRepository.update(id, taskData);

            if (result.affected === 0) throw new Error(`Task with ID ${id} not found`);

            const updatedTask = await this.getOne(id);
            setLog({ level: 'info', method: 'TaskService.update', message: `Task updated successfully: ${id}` });
            return updatedTask;
        } catch (err: any) {
            setLog({ level: 'error', method: 'TaskService.update', message: 'Error while updating task', error: err });
            throw err;
        }
    }

    /**
     * Soft delete a task by ID.
     * @param id - The ID of the task to delete.
     * @throws Error if the task is not found.
     */
    async delete(id: string): Promise<void> {
        try {
            setLog({ level: 'info', method: 'TaskService.delete', message: `Soft deleting task with ID: ${id}` });

            const result = await this.taskRepository.update(id, { deletedAt: new Date() });

            if (result.affected === 0) throw new Error(`Task with ID ${id} not found`);

            setLog({ level: 'info', method: 'TaskService.delete', message: `Task soft deleted successfully: ${id}` });
        } catch (err: any) {
            setLog({ 
                level: 'error',
                method: 'TaskService.delete', 
                message: 'Error while soft deleting task', 
                error: err 
            });

            throw err;
        }
    }
}
