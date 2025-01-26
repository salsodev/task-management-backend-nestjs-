import { PartialType } from '@nestjs/mapped-types';
import { CreateSubtaskDto } from './create-subtask.dto';

export class updateSubtaskDto extends PartialType(CreateSubtaskDto) {}
