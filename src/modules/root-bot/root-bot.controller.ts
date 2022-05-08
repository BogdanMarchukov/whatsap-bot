import { Body, Controller, Post } from '@nestjs/common';
import { RootBotService } from './root-bot.service';
import { InputMessageDTO } from './dto/notification.dto';

@Controller('root')
export class RootBotController {
  constructor(private readonly rootBotService: RootBotService) {}

  @Post()
  createBot(@Body() inputMessageDTO: InputMessageDTO) {
    this.rootBotService.createBot(inputMessageDTO);
  }
}
