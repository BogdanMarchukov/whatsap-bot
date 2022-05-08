import { Injectable, NotFoundException } from '@nestjs/common';
import { InputMessageDTO, TypeMessage } from './dto/notification.dto';

@Injectable()
export class RootBotService {
  public createBot(inputMessageDTO: InputMessageDTO) {
    const { chatId } = inputMessageDTO.senderData;
    if (inputMessageDTO.typeMessage === 'textMessage') {
      const {
        textMessageData: { textMessage },
      } = inputMessageDTO.messageData;
      if (textMessage.toLowerCase() === '#регистрация') {
      }
    } else {
      throw NotFoundException;
    }
  }
}
