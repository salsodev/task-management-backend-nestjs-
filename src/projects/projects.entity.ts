import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  logoUrl: String;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column('text')
  description: string;

  @Column('timestamp', { nullable: true })
  startDate: Date;

  @Column('timestamp', { nullable: true })
  dueDate: Date;

  @OneToMany(() => Task, (task) => task.project, {
    cascade: true,
    nullable: true,
  })
  tasks: Task[]; // one - many

  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
