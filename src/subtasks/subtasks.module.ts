import { Module } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './subtask.entity';
import { TaskModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask]), TaskModule],
  providers: [SubtasksService],
  controllers: [SubtasksController],
})
export class SubtasksModule {}
