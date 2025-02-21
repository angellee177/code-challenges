// src/controllers/task.controller.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { successResponse, errorResponse } from '../common/response.helper';

export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    /**
     * Create a new task
     */
    async createTask(req: Request, res: Response) {
        try {
            const task = await this.taskService.create(req.body);
            res.status(201).json(successResponse('Task successfully created', task));
        } catch (error: any) {
            res.status(400).json(errorResponse('Failed to create task', error.message));
        }
    }

    /**
     * Get all tasks with pagination
     */
    async getAllTasks(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 25;

            const tasks = await this.taskService.getAll(page, limit);
            res.status(200).json(successResponse('Tasks fetched successfully', tasks));
        } catch (error: any) {
            res.status(500).json(errorResponse('Failed to fetch tasks', error.message));
        }
    }

    /**
     * Get a task by ID
     */
    async getTaskById(req: Request, res: Response) {
        try {
            const task = await this.taskService.getOne(req.params.id);
            res.status(200).json(successResponse('Task fetched successfully', task));
        } catch (error: any) {
            res.status(404).json(errorResponse('Failed to fetch task', error.message));
        }
    }

    /**
     * Update a task by ID
     */
    async updateTask(req: Request, res: Response) {
        try {
            const updatedTask = await this.taskService.update(req.params.id, req.body);
            res.status(200).json(successResponse('Task updated successfully', updatedTask));
        } catch (error: any) {
            res.status(400).json(errorResponse('Failed to update task', error.message));
        }
    }

    /**
     * Delete a task by ID
     */
    async deleteTask(req: Request, res: Response) {
        try {
            await this.taskService.delete(req.params.id);
            res.status(200).json(successResponse('Task deleted successfully'));
        } catch (error: any) {
            res.status(400).json(errorResponse('Failed to delete task', error.message));
        }
    }
}
