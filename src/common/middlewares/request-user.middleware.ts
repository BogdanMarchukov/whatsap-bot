import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InputMessageDTO } from '../dto/notification.dto';
import { UserBotRepository } from '../../modules/root-bot/user-bot.repository';
import { UserBot } from '../../modules/root-bot/entity/user-bot.entity';

export interface RequestUser extends Request {
  body: InputMessageDTO;
  userBot: UserBot[];
}

@Injectable()
export class RequestUserMiddleware implements NestMiddleware {
  constructor(private readonly userBotRepository: UserBotRepository) {}
  private async getUserBot(req: RequestUser) {
    const { chatId } = req.body.senderData;
    return await this.userBotRepository.find({ chatId });
  }

  async use(req: RequestUser, res: Response, next: NextFunction) {
    req.userBot = await this.getUserBot(req);
    next();
  }
}
