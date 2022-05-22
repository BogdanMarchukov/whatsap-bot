import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InputMessageDTO } from '../dto/notification.dto';
import { ActionType } from './action-type';

export interface ActionRequest extends Request {
  body: InputMessageDTO;
  action: ActionType;
}

@Injectable()
export class CreateActionMiddleware implements NestMiddleware {
  createAction(req: ActionRequest) {
    const { typeMessage, textMessageData } = req.body.messageData;
    const text = textMessageData.textMessage.toLowerCase();
    const textActionArray = text.split(':');
    if (typeMessage === 'textMessage') {
      if (text === '#r') {
        return ActionType.TEMPLATE_REGISTRATION;
      }
      if (textActionArray[0] === '#r-Имя') {
        return ActionType.REGISTRATION;
      }
      if (text === '#s') {
        return ActionType.TEMPLATE_USER_MESSAGE;
      }
    }
  }

  async use(req: ActionRequest, res: Response, next: NextFunction) {
    req.action = this.createAction(req);
    next();
  }
}
