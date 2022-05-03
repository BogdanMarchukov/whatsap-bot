import { Module } from '@nestjs/common';
import { RootBotService } from './root-bot.service';
import { RootBotController } from './root-bot.controller';

@Module({
  controllers: [RootBotController],
  providers: [RootBotService],
})
export class RootBotModule {}
