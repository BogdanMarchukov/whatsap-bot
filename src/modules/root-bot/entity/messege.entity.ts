import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBot } from './user-bot.entity';
import { IsOptional } from 'class-validator';
@Entity()
export class Messege {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  imageUrl?: string;

  @Column('varchar')
  text!: string;

  @Column('timestamptz')
  when!: Date;

  @Column('uuid')
  groupId!: string;

  @ManyToOne(() => UserBot, (UserBot) => UserBot.chats)
  userBot: UserBot;
}
