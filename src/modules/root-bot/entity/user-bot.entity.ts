import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class UserBot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('varchar')
  idInstance!: string;

  @Column('varchar')
  apiTokenInstance!: string;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  chatId!: string;

  @Column({ type: 'timestamptz', nullable: true })
  removed: Date | null;

  @OneToMany(() => Group, (group) => group.userBot)
  chats: Group[];
}
