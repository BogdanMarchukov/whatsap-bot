import { Body, Controller, Post } from '@nestjs/common';
import { InputMessageDTO } from '../../common/dto/notification.dto';
import { RequestAction } from '../../common/decorators/requers-action-decorators';
import { ActionRequest } from '../../common/middlewares/create-actions.middleware';
import { ActionType } from '../../common/middlewares/action-type';

@Controller('user-bot')
export class UserBotController {
  @Post()
  userBot(
    @Body() inputMessageDTO: InputMessageDTO,
    @RequestAction() reqAction: ActionRequest,
  ) {
    switch (reqAction.action) {
      case ActionType.TEMPLATE_USER_MESSAGE:
        return true;
    }
  }
}
