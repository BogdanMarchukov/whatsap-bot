import { Body, Controller, Post } from '@nestjs/common';
import { RootBotService } from './root-bot.service';
import { InputMessageDTO } from './dto/notification.dto';

@Controller('root')
export class RootBotController {
  constructor(private readonly rootBotService: RootBotService) {}

  @Post()
  async createBot(@Body() inputMessageDTO: InputMessageDTO) {
    return await this.rootBotService.createBot(inputMessageDTO);
  }
}
