import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/projects.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { SubtasksService } from './subtasks/subtasks.service';
import { SubtasksController } from './subtasks/subtasks.controller';
import { Task } from './tasks/task.entity';
import { Subtask } from './subtasks/subtask.entity';
import { TaskController } from './tasks/tasks.controller';
import { TaskService } from './tasks/tasks.service';
import { TaskModule } from './tasks/tasks.module';
import { AuthController } from './auth/auth.controller';
import { ProjectController } from './projects/projects.controller';
import { ProjectService } from './projects/projects.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { SubtasksModule } from './subtasks/subtasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      entities: [Project, User, Task, Subtask],
      synchronize: true,
    }),
    ProjectModule,
    UsersModule,
    AuthModule,
    TaskModule,
    SubtasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
