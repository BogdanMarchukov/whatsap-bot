import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ActionType } from './action-type';
import { DateTime } from 'luxon';

export interface ActionRequest extends Request {
  action: ActionType;
}

@Injectable()
export class CreateActionMiddleware implements NestMiddleware {
  createAction(req: ActionRequest) {
    const messageType = ['textMessage', 'imageMessage'];
    const moscow = DateTime.local(2022, 7, 6, 20, 30, 20).setZone(
      'Europe/Moscow',
    );
    const teme = DateTime.local().setZone('Europe/Moscow');
    if (moscow.toSQL() > teme.toSQL()) {
      console.log('Moscow');
    } else {
      console.log('time');
    }
    const typeMessage = req.body.messageData.typeMessage;
    const textMessageData = req.body.messageData.textMessageData;
    if (!typeMessage || !textMessageData) {
      return ActionType.NULL;
    }
    const text = textMessageData?.textMessage?.toLowerCase();
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
