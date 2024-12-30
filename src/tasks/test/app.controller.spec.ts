import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto';
import { Task } from '../entity/task.entity';
import { TasksController } from '../controllers/tasks.controller';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  const mockTask: Task = {
    _id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    completed: false,
    createdAt: new Date(),
  };

  const mockTasksService = {
    create: jest.fn().mockResolvedValue(mockTask),
    findAll: jest.fn().mockResolvedValue([mockTask]),
    findOne: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn().mockResolvedValue({ ...mockTask, title: 'Updated Task' }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService, // Mock del servicio
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'This is a test task',
        completed: false,
      };

      const result = await tasksController.create(createTaskDto);

      expect(result).toEqual(mockTask);
      expect(tasksService.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = await tasksController.findAll();

      expect(result).toEqual([mockTask]);
      expect(tasksService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const result = await tasksController.findOne('1');

      expect(result).toEqual(mockTask);
      expect(tasksService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated description',
        completed: true,
      };

      const result = await tasksController.update('1', updateTaskDto);

      expect(result).toEqual({ ...mockTask, title: 'Updated Task' });
      expect(tasksService.update).toHaveBeenCalledWith('1', updateTaskDto);
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const result = await tasksController.remove('1');

      expect(result).toBeUndefined();
      expect(tasksService.remove).toHaveBeenCalledWith('1');
    });
  });
});
