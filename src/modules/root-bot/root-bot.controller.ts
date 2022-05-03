import { Controller, Post } from '@nestjs/common';
import { RootBotService } from './root-bot.service';

@Controller('root')
export class RootBotController {
  constructor(private readonly rootBotService: RootBotService) {}

  @Post()
  createBot() {
    this.rootBotService.createBot();
  }
}
