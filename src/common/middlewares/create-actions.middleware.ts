import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ActionType } from './action-type';

export interface ActionRequest extends Request {
  action: ActionType;
}

@Injectable()
export class CreateActionMiddleware implements NestMiddleware {
  createAction(req: ActionRequest) {
    if (
      !req.body.messageData ||
      req.body.messageData.typeMessage !== 'textMessage'
    ) {
      return ActionType.NULL;
    }
    const { typeMessage, textMessageData } = req.body.messageData;
    const text = textMessageData.textMessage.toLowerCase();
    const textActionArray = text.split(':');
    console.log(textActionArray);
    if (typeMessage === 'textMessage') {
      if (text === '#r') {
        return ActionType.TEMPLATE_REGISTRATION;
      }
      if (textActionArray[0] === '#r-имя') {
        return ActionType.REGISTRATION;
      }
      if (text === '#s') {
        return ActionType.TEMPLATE_USER_MESSAGE;
      }
      if (text === '#g') {
        return ActionType.TEMPLATE_ADD_CHAT;
      }
      return ActionType.NULL;
    }
  }

  async use(req: ActionRequest, res: Response, next: NextFunction) {
    req.action = this.createAction(req);
    next();
  }
}
