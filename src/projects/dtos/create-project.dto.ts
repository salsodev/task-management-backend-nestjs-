import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Task } from 'src/tasks/task.entity';

export class CreateProjectDto {
  @IsString()
  name;

  @IsOptional()
  @IsUrl()
  logoUrl: String;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  dueDate: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Task)
  tasks: Task[]; // one - many
}
