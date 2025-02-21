import { TaskController } from './task.controller';
import { TaskService } from '../services/task.service';
import { successResponse, errorResponse } from '../common/response.helper';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/Task.entity';
import { Category } from '../models/Category.entity';

describe('TaskController', () => {
    let taskService: TaskService;
    let taskController: TaskController;

    const createMockTask = (overrides = {}): Task => ({
        id: uuidv4(),
        title: 'Sample Task',
        status: 'pending',
        category: { name: 'sample category' } as Category,
        categoryId: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
    });

    beforeEach(() => {
        taskService = {
            create: jest.fn(),
            getAll: jest.fn(),
            getOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as unknown as TaskService;

        taskController = new TaskController(taskService);
    });

    describe('createTask', () => {
        it('should create a task successfully', async () => {
            const task = createMockTask({ title: 'New Task', completed: false });
            jest.spyOn(taskService, 'create').mockResolvedValue(task as Task);

            const req: any = { body: { title: 'New Task', completed: false } };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await taskController.createTask(req, res);

            expect(taskService.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(successResponse('Task successfully created', task));
        });

        it('should return an error if task creation fails', async () => {
            jest.spyOn(taskService, 'create').mockRejectedValue(new Error('Creation failed'));

            const req: any = { body: { title: 'New Task', completed: false } };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await taskController.createTask(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(errorResponse('Failed to create task', 'Creation failed'));
        });
    });

    describe('getAllTasks', () => {
        it('should return an array of tasks with metadata', async () => {
            const tasks = [createMockTask(), createMockTask()];
            const result = {
            data: tasks.map((task) => ({
                    ...task,
                    category: (task.category as unknown as string) || null, // Cast to string or null
                })),
                meta: { total: 10, page: 1, limit: 10 },
            };
            
            jest.spyOn(taskService, 'getAll').mockResolvedValue(result);
    
            const req: any = { query: { page: '1', limit: '10' } };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await taskController.getAllTasks(req, res);
    
            expect(taskService.getAll).toHaveBeenCalledWith(1, 10);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(successResponse('Tasks fetched successfully', result));
        });
    
        it('should return an error if fetching fails', async () => {
            jest.spyOn(taskService, 'getAll').mockRejectedValue(new Error('Fetching failed'));
    
            const req: any = { query: {} };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await taskController.getAllTasks(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(errorResponse('Failed to fetch tasks', 'Fetching failed'));
        });
    });
    

    describe('getTaskById', () => {
        it('should return a task by ID', async () => {
            const task = createMockTask();
            jest.spyOn(taskService, 'getOne').mockResolvedValue(task);

            const req: any = { params: { id: task.id } };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await taskController.getTaskById(req, res);

            expect(taskService.getOne).toHaveBeenCalledWith(task.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(successResponse('Task fetched successfully', task));
        });

        it('should return an error if the task is not found', async () => {
            jest.spyOn(taskService, 'getOne').mockRejectedValue(new Error('Task not found'));

            const req: any = { params: { id: uuidv4() } };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await taskController.getTaskById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(errorResponse('Failed to fetch task', 'Task not found'));
        });
    });

    describe('updateTask', () => {
        it('should update a task successfully', async () => {
            const task = createMockTask({ title: 'Updated Task', completed: true });
            jest.spyOn(taskService, 'update').mockResolvedValue(task);

            const req: any = { params: { id: task.id }, body: { title: 'Updated Task', completed: true } };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await taskController.updateTask(req, res);

            expect(taskService.update).toHaveBeenCalledWith(task.id, req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(successResponse('Task updated successfully', task));
        });

        it('should return an error if updating fails', async () => {
            jest.spyOn(taskService, 'update').mockRejectedValue(new Error('Update failed'));

            const req: any = { params: { id: uuidv4() }, body: { title: 'Updated Task' } };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await taskController.updateTask(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(errorResponse('Failed to update task', 'Update failed'));
        });
    });

    describe('deleteTask', () => {
        it('should delete a task successfully', async () => {
            jest.spyOn(taskService, 'delete').mockResolvedValue(undefined);

            const req: any = { params: { id: uuidv4() } };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await taskController.deleteTask(req, res);

            expect(taskService.delete).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(successResponse('Task deleted successfully'));
        });

        it('should return an error if deleting fails', async () => {
            jest.spyOn(taskService, 'delete').mockRejectedValue(new Error('Delete failed'));

            const req: any = { params: { id: uuidv4() } };
            const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await taskController.deleteTask(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(errorResponse('Failed to delete task', 'Delete failed'));
        });
    });
});
