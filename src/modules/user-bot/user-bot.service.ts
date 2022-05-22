import { Injectable } from '@nestjs/common';
import { TextService } from '../message/text.service';

@Injectable()
export class UserBotService {
  constructor(private readonly textService: TextService) {}
  async userMassage(message: string, chatId: string, template = false) {
    if (template) {
      return await this.textService.sentMessage()
    }
  }
}
