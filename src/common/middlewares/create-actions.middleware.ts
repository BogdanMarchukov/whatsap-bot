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
    try {
      const moscow = DateTime.local(2022, 12, 6, 20, 30, 20).setZone(
        'Europe/Moscow',
      );
      console.log(moscow);
      const teme = DateTime.local().setZone('Europe/Moscow');
      if (moscow.toSQL() > teme.toSQL()) {
        console.log('Moscow');
      } else {
        console.log('time');
      }
    } catch (e) {
      console.log(e, 'error');
    }

    const typeMessage = req.body.messageData.typeMessage;
    let textMessageData = req.body.messageData.textMessageData;
    if (!textMessageData) {
      textMessageData = {
        textMessage: req.body.messageData.fileMessageData.caption,
      };
    }
    if (!typeMessage || !textMessageData) {
      return ActionType.NULL;
    }
    const text = textMessageData?.textMessage?.toLowerCase();
    const textActionArray = text.split(':');
    console.log(textActionArray);
    const type = ['imageMessage', 'textMessage'];
    console.log(type.includes(typeMessage), 'gggggggg');
    if (type.includes(typeMessage)) {
      if (text === '#r') {
        return ActionType.TEMPLATE_REGISTRATION;
      }
      if (text === '#') {
        return ActionType.HELP;
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
      if (textActionArray[0] === '#sa') {
        return ActionType.USER_MESSAGE;
      }
      return ActionType.NULL;
    }
    return ActionType.NULL;
  }

  async use(req: ActionRequest, res: Response, next: NextFunction) {
    req.action = this.createAction(req);
    next();
  }
}
