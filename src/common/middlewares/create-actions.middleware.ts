import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InputMessageDTO } from '../../modules/root-bot/dto/notification.dto';
import { ActionType } from './action-type';

export interface ActionRequest extends Request {
  body: InputMessageDTO;
  action: string;
}

@Injectable()
export class CreateActionMiddleware implements NestMiddleware {
  createAction(req: ActionRequest) {
    const { typeMessage, textMessageData } = req.body.messageData;
    if (typeMessage === 'textMessage') {
      if (textMessageData.textMessage.toLowerCase() === '#r') {
        return ActionType.TEMPLATE_REGISTRATION;
      }
    }
  }

  async use(req: ActionRequest, res: Response, next: NextFunction) {
    req.action = this.createAction(req);
    next();
  }
}
