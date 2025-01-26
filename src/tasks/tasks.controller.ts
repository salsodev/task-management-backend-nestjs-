import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTask();
  }

  @Post(':projectId')
  createTask(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.createTask(projectId, createTaskDto);
  }

  @Get(':id')
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTask(id);
  }

  @Delete(':taskId')
  delete(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.delete(taskId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }
}
