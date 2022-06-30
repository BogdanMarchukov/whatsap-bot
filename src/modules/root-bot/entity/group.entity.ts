import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBot } from './user-bot.entity';
@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('varchar')
  groupId!: string;

  @Column('varchar')
  groupName!: string;

  @Column({ type: 'timestamptz', nullable: true })
  removed: Date | null;

  @ManyToOne(() => UserBot, (UserBot) => UserBot.chats)
  userBot: UserBot;
}
