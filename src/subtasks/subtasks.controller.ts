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
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskDto } from './dtos/create-subtask.dto';
import { updateSubtaskDto } from './dtos/update-subtask.dto';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtaskService: SubtasksService) {}

  @Get()
  async getAllSubtasks() {
    return this.subtaskService.getAllSubtasks();
  }

  @Post(':taskId')
  async createSubtask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body(ValidationPipe) createSubtaskDto: CreateSubtaskDto,
  ) {
    return this.subtaskService.createSubtask(taskId, createSubtaskDto);
  }

  @Get(':id')
  getSubtask(@Param('id', ParseIntPipe) id: number) {
    return this.subtaskService.getSubtask(id);
  }

  @Delete(':subtaskId')
  delete(@Param('subtaskId', ParseIntPipe) subtaskId: number) {
    return this.subtaskService.delete(subtaskId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateSubtaskDto: updateSubtaskDto,
  ) {
    return this.subtaskService.update(id, updateSubtaskDto);
  }
}
