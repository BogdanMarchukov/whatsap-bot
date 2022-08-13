import { Body, Controller, Post } from '@nestjs/common';
import { RootBotService } from './root-bot.service';
import { InputMessageDTO } from '../../common/dto/notification.dto';
import { RequestAction } from '../../common/decorators/requers-action-decorators';
import { ActionType } from '../../common/middlewares/action-type';
import { RequestUserDecorator } from '../../common/decorators/request-user.decorator';
import { UserBot } from './entity/user-bot.entity';

@Controller('root')
export class RootBotController {
  constructor(private readonly rootBotService: RootBotService) {}

  @Post()
  async createBot(
    @Body() inputMessageDTO: InputMessageDTO,
    @RequestAction() reqAction: ActionType,
    @RequestUserDecorator() userBot: UserBot,
  ) {
    const chatId = inputMessageDTO.senderData?.chatId;
    switch (reqAction) {
      case ActionType.HELP:
        return await this.rootBotService.helperText(chatId);
      case ActionType.TEMPLATE_REGISTRATION:
        return await this.rootBotService.registerBot(null, chatId, true);
      case ActionType.REGISTRATION:
        return await this.rootBotService.registerBot(
          inputMessageDTO?.messageData?.textMessageData?.textMessage,
          chatId,
        );
      case ActionType.TEMPLATE_ADD_CHAT:
        if (userBot) {
          return await this.rootBotService.sentTemplateAddGroup(userBot);
        } else {
          return await this.rootBotService.registerBot(null, chatId, true);
        }
      case ActionType.TEMPLATE_USER_MESSAGE:
        return await this.rootBotService.sentTemplateUserMessage(chatId);
      case ActionType.USER_MESSAGE:
        return await this.rootBotService.delayedMessage(
          inputMessageDTO,
          userBot,
        );
      default:
        return;
    }
  }
}
