import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class UserBot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('varchar')
  idInstance: string;

  @Column('varchar')
  apiTokenInstance: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  channelID: string;

  @Column('timestamptz')
  removed: Date;
}
