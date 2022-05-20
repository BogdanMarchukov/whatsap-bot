import { Body, Controller, Post } from '@nestjs/common';
import { RootBotService } from './root-bot.service';
import { InputMessageDTO } from './dto/notification.dto';
import { RequestAction } from '../../common/decorators/requers-action-decorators';
import { ActionRequest } from '../../common/middlewares/create-actions.middleware';
import { ActionType } from '../../common/middlewares/action-type';

@Controller('root')
export class RootBotController {
  constructor(private readonly rootBotService: RootBotService) {}

  @Post()
  async createBot(
    @Body() inputMessageDTO: InputMessageDTO,
    @RequestAction() reqAction: ActionRequest,
  ) {
    switch (reqAction.action) {
      case ActionType.TEMPLATE_REGISTRATION:
        // TODO ОТПРАВКА ШАБЛОНА РЕГИСТРАЦИИ
        return await this.rootBotService.createBot(inputMessageDTO);
      default:
        return;
    }
  }
}
