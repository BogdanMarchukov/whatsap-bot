import { Module } from '@nestjs/common';
import { UserBotController } from './user-bot.controller';
import { UserBotService } from './user-bot.service';

@Module({
  controllers: [UserBotController],
  providers: [UserBotService],
})
export class UserBotModule {}
