import { Injectable } from '@nestjs/common';
import { TextService } from '../message/text.service';
import { UserBot } from '../root-bot/entity/user-bot.entity';

@Injectable()
export class UserBotService {
  constructor(private readonly textService: TextService) {}
  async userMassage(message: string, usrBot: UserBot, template = false) {
    const { chatId, apiTokenInstance, idInstance } = usrBot;
    if (template) {
      return;
    }
  }
}
