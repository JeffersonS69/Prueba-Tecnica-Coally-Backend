import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { messageTaskCreated, messageTaskDeleted, messageTaskRetrieved, messageTaskUpdated } from 'src/utils/message';
import { Task } from '../entity/task.entity';
@ApiBearerAuth()
@ApiTags('tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: messageTaskCreated,
    type: Task,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'completed', required: false, type: Boolean })
  @ApiResponse({
    status: 200,
    description: messageTaskRetrieved,
    type: [Task],
  })
  findAll(@Query('completed') completed?: string) {
    const filter = completed ? { completed: completed === 'true' } : {};
    return this.tasksService.findAll(filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiResponse({
    status: 200,
    description: messageTaskRetrieved,
    type: Task,
  })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 200,
    description: messageTaskUpdated,
    type: Task,
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiResponse({
    status: 204,
    description: messageTaskDeleted,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
