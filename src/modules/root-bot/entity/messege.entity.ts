import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBot } from './user-bot.entity';
@Entity()
export class Messege {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('varchar')
  imageUrl!: string;

  @Column('varchar')
  text!: string;

  @Column('timestamptz')
  when!: Date;

  @ManyToOne(() => UserBot, (UserBot) => UserBot.chats)
  userBot: UserBot;
}
