import { Body, Controller, Post } from '@nestjs/common';
import { InputMessageDTO } from '../../common/dto/notification.dto';
import { RequestAction } from '../../common/decorators/requers-action-decorators';
import { ActionRequest } from '../../common/middlewares/create-actions.middleware';
import { ActionType } from '../../common/middlewares/action-type';
import { RequestUserDecorator } from '../../common/decorators/request-user.decorator';
import { UserBot } from '../root-bot/entity/user-bot.entity';

@Controller('user-bot')
export class UserBotController {
  @Post()
  userBot(
    @Body() inputMessageDTO: InputMessageDTO,
    @RequestAction() reqAction: ActionRequest,
    @RequestUserDecorator() usrBot: UserBot,
  ) {
    switch (reqAction.action) {
      case ActionType.TEMPLATE_USER_MESSAGE:
        return true;
    }
  }
}
