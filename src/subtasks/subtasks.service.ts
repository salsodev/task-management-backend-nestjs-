import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtask } from './subtask.entity';
import { Repository } from 'typeorm';
import { CreateSubtaskDto } from './dtos/create-subtask.dto';
import { TaskService } from 'src/tasks/tasks.service';
import { updateSubtaskDto } from './dtos/update-subtask.dto';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>,
    private readonly taskService: TaskService,
  ) {}

  async getAllSubtasks() {
    return await this.subtaskRepository.find();
  }

  async createSubtask(taskId: number, createSubtaskDto: CreateSubtaskDto) {
    const task = await this.taskService.getTask(taskId);

    const subtask = await this.subtaskRepository.create(createSubtaskDto);

    subtask.task = task;

    return await this.subtaskRepository.save(subtask);
  }

  async getSubtask(id: number) {
    const subtask = await this.subtaskRepository.findOneBy({ id });

    if (!subtask) {
      throw new NotFoundException('We have no such subtask with us');
    }

    return subtask;
  }

  async delete(id: number) {
    const subtask = await this.getSubtask(id);

    await this.subtaskRepository.delete(subtask.id);
  }

  async update(id: number, updateSubtaskDto: updateSubtaskDto) {
    const subtask = await this.getSubtask(id);

    const newSubtask = Object.assign(subtask, updateSubtaskDto);

    return this.subtaskRepository.save(newSubtask);
  }
}
