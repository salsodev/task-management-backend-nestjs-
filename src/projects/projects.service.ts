import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UsersService,
  ) {}

  async getAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find({ relations: { tasks: true } });
  }

  async createProject(
    username: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const user = await this.userService.findOne(username);

    const existingProject = await this.projectRepository.findOneBy({
      name: createProjectDto.name,
    });

    if (existingProject) {
      throw new ConflictException('Project name already exists.');
    }

    const newProject = await this.projectRepository.create(createProjectDto);

    newProject.user = user;

    return await this.projectRepository.save(newProject);
  }

  async getProject(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: {
        id: id,
      },
      relations: { tasks: true },
    });

    if (!project) {
      throw new NotFoundException(`Project cannot be found`);
    }

    return project;
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.getProject(id);
    let newProject = Object.assign(project, updateProjectDto);

    return this.projectRepository.save(newProject);
  }

  async deleteProject(id: number) {
    const project = await this.getProject(id);

    await this.projectRepository.delete(project.id);
  }
}
