import { Injectable, NotFoundException } from '@nestjs/common';
import { InputMessageDTO, TypeMessage } from './dto/notification.dto';
import { ConfigService } from '@nestjs/config';
import { RootCredentialType } from '../../config/configuration';
import { TextService } from '../message/text.service';

@Injectable()
export class RootBotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly textService: TextService,
  ) {}
  private rootCredential =
    this.configService.get<RootCredentialType>('rootCredential');

  public async createBot(inputMessageDTO: InputMessageDTO) {
    const { chatId } = inputMessageDTO.senderData;
    if (inputMessageDTO.messageData.typeMessage === 'textMessage') {
      const {
        textMessageData: { textMessage },
      } = inputMessageDTO.messageData;
      if (textMessage.toLowerCase() === '#регистрация') {
        await this.textService.sentMessage(
          this.rootCredential.instance,
          this.rootCredential.token,
          '#Имя:Вася,IdInstance:1111111111,ApiTokenInstance:0000000000000000',
          chatId,
        );
      }
    } else {
      throw NotFoundException;
    }
  }
}
