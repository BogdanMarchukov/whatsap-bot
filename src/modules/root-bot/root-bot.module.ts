import { Module } from '@nestjs/common';
import { RootBotService } from './root-bot.service';
import { RootBotController } from './root-bot.controller';
import { MessageModule } from '../message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBotRepository } from './user-bot.repository';
import { GroupRepository } from './group.repository';
import { MessageRepository } from './message.repository';

@Module({
  imports: [
    MessageModule,
    TypeOrmModule.forFeature([
      UserBotRepository,
      GroupRepository,
      MessageRepository,
    ]),
  ],
  controllers: [RootBotController],
  providers: [RootBotService],
})
export class RootBotModule {}
