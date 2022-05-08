import { Module } from '@nestjs/common';
import { RootBotService } from './root-bot.service';
import { RootBotController } from './root-bot.controller';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [RootBotController],
  providers: [RootBotService],
})
export class RootBotModule {}
