import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RootCredentialType } from '../../config/configuration';
import { TextService } from '../message/text.service';
import { UserBotRepository } from './user-bot.repository';

interface ClientDataType {
  name: string | null;
  IdInstance: string | null;
  ApiTokenInstance: string | null;
}

@Injectable()
export class RootBotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly textService: TextService,
    private readonly userBotRepository: UserBotRepository,
  ) {}
  private rootCredential =
    this.configService.get<RootCredentialType>('rootCredential');

  public async registerBot(
    message: string | null,
    chatId: string,
    template = false,
  ) {
    const clientBotData: ClientDataType = {
      name: null,
      IdInstance: null,
      ApiTokenInstance: null,
    };
    if (template) {
      await this.textService.sentMessage(
        this.rootCredential.instance,
        this.rootCredential.token,
        '#r-Имя:Вася,IdInstance:1111111111,ApiTokenInstance:0000000000000000',
        chatId,
      );
      return;
    } else {
      message.split(',').forEach((i, index) => {
        if (index === 0) {
          clientBotData.name = i.split(':')[1];
        }
        if (index === 1) {
          clientBotData.IdInstance = i.split(':')[1];
        }
        if (index === 3) {
          clientBotData.ApiTokenInstance = i.split(':')[1];
        }
      });
      const result = await this.textService.registerWebhook(
        clientBotData.IdInstance,
        clientBotData.ApiTokenInstance,
      );
      if (result.status < 400) {
        const userBot = this.userBotRepository.create({
          chatId,
          name: clientBotData.name,
          apiTokenInstance: clientBotData.ApiTokenInstance,
          idInstance: clientBotData.IdInstance,
        });
        await this.userBotRepository.save(userBot);
        await this.textService.sentMessage(
          clientBotData.IdInstance,
          clientBotData.ApiTokenInstance,
          `Бот ${clientBotData.name} зарегистрирован`,
          chatId,
        );
      }
    }
  }
}
