import { Injectable, NotFoundException } from '@nestjs/common';
import { InputMessageDTO, TypeMessage } from './dto/notification.dto';

@Injectable()
export class RootBotService {
  public createBot(inputMessageDTO: InputMessageDTO) {
    if (inputMessageDTO.typeMessage === 'textMessage') {
      const {
        textMessageData: { textMessage },
      } = inputMessageDTO.messageData;
    } else {
      throw NotFoundException;
    }
  }
}
