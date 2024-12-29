import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from '../dto';
import {
  messageErrorCreatingTask,
  messageErrorDeletingTask,
  messageErrorRetrievingTasks,
  messageErrorUpdatingTask,
  messageInvalidData,
  messageInvalidTaskId,
  messageTaskNotFound,
} from 'src/utils/message';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const createdTask = new this.taskModel(createTaskDto);
      return await createdTask.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(messageInvalidData);
      }
      throw new InternalServerErrorException(messageErrorCreatingTask);
    }
  }

  async findAll(filter?: { completed?: boolean }): Promise<Task[]> {
    try {
      return await this.taskModel.find(filter).exec();
    } catch (error) {
      throw new InternalServerErrorException(messageErrorRetrievingTasks);
    }
  }

  async findOne(id: string): Promise<Task> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException(messageInvalidTaskId);
    }
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(messageTaskNotFound);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException(messageInvalidTaskId);
    }
    try {
      const task = await this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, { new: true })
        .exec();
      if (!task) {
        throw new NotFoundException(messageTaskNotFound);
      }
      return task;
    } catch (error) {
      throw new InternalServerErrorException(messageErrorUpdatingTask);
    }
  }

  async remove(id: string): Promise<void> {
    if (!this.isValidObjectId(id)) {
      throw new BadRequestException(messageInvalidTaskId);
    }

    try {
      const result = await this.taskModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(messageTaskNotFound);
      }
    } catch (error) {
      throw new InternalServerErrorException(messageErrorDeletingTask);
    }
  }

  private isValidObjectId(id: string): boolean {
    const ObjectId = require('mongoose').Types.ObjectId;
    return ObjectId.isValid(id);
  }
}
