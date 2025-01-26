import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { ProjectService } from 'src/projects/projects.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Project } from 'src/projects/projects.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly projectService: ProjectService,
  ) {}

  async getAllTask() {
    return this.taskRepository.find({ relations: { subtasks: true } });
  }

  async createTask(projectId: number, createTaskDto: CreateTaskDto) {
    const project = await this.projectService.getProject(projectId);

    const newTask = await this.taskRepository.create(createTaskDto);

    newTask.project = project;

    return await this.taskRepository.save(newTask);
  }

  async getTask(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { subtasks: true },
    });

    if (!task) {
      throw new NotFoundException('We have no such task with us');
    }

    return task;
  }

  async delete(id: number) {
    const task = await this.getTask(id);

    await this.taskRepository.delete(task.id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.getTask(id);

    const newTask = Object.assign(task, updateTaskDto);

    return this.taskRepository.save(newTask);
  }
}
