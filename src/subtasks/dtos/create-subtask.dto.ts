import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Task } from 'src/tasks/task.entity';

export class CreateSubtaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  footNote: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @Type(() => Task)
  project: Task;
}
