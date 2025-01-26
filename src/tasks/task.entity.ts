import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Priority, Status } from './dtos/create-task.dto';
import { Project } from 'src/projects/projects.entity';
import { Subtask } from 'src/subtasks/subtask.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: Status.TODO })
  status: Status;

  @Column({ default: Priority.NONE })
  priority: Priority;

  @Column('text', { array: true, nullable: true })
  labels: string[];

  @Column('timestamp', { nullable: true })
  dueDate: Date;

  @Column('text', { array: true, nullable: true })
  attachmentUrls: string[];

  @ManyToOne(() => Project, (project) => project.tasks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  project: Project;

  @OneToMany(() => Subtask, (subtask) => subtask.task, { cascade: true })
  subtasks: Subtask[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
