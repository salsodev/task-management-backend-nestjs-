import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Project } from 'src/projects/projects.entity';
import { Subtask } from 'src/subtasks/subtask.entity';

export enum Status {
  BACKLOG = 'backlog',
  TODO = 'todo',
  IN_PROGRESS = 'in progress',
  IN_REVIEW = 'in review',
  DONE = 'done',
  CANCELED = 'canceled',
}

export enum Priority {
  NONE = 'none',
  URGENT = 'urgent',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsEnum(Priority)
  priority: Priority;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels: string[];

  @IsOptional()
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  attachmentUrls: string[];

  @IsOptional()
  @Type(() => Project)
  project: Project; // many - one

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Subtask)
  subtasks: Subtask[]; // one - many
}
