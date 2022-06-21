import { Module } from '@nestjs/common';
import { UserBotController } from './user-bot.controller';
import { UserBotService } from './user-bot.service';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [UserBotController],
  providers: [UserBotService],
})
export class UserBotModule {}
