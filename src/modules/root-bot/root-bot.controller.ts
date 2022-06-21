import { Body, Controller, Post } from '@nestjs/common';
import { RootBotService } from './root-bot.service';
import { InputMessageDTO } from '../../common/dto/notification.dto';
import { RequestAction } from '../../common/decorators/requers-action-decorators';
import { ActionRequest } from '../../common/middlewares/create-actions.middleware';
import { ActionType } from '../../common/middlewares/action-type';

@Controller('root')
export class RootBotController {
  constructor(private readonly rootBotService: RootBotService) {}

  @Post()
  async createBot(
    @Body() inputMessageDTO: InputMessageDTO,
    @RequestAction() reqAction: ActionType,
  ) {
    const { chatId } = inputMessageDTO.senderData;
    const { textMessage } = inputMessageDTO.messageData.textMessageData;
    console.log(reqAction);
    switch (reqAction) {
      case ActionType.TEMPLATE_REGISTRATION:
        return await this.rootBotService.registerBot(null, chatId, true);
      case ActionType.REGISTRATION:
        return await this.rootBotService.registerBot(textMessage, chatId);
      default:
        return;
    }
  }
}
