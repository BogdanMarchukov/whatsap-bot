import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RootCredentialType } from '../../config/configuration';
import { TextService } from '../message/text.service';
import { UserBotRepository } from './user-bot.repository';
import { UserBot } from './entity/user-bot.entity';
import { GroupRepository } from './group.repository';
import { InputMessageDTO } from '../../common/dto/notification.dto';

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
    private readonly groupRepository: GroupRepository,
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
          return;
        }
        if (index === 1) {
          clientBotData.IdInstance = i.split(':')[1];
          return;
        }
        if (index === 2) {
          clientBotData.ApiTokenInstance = i.split(':')[1];
        }
      });

      const isBot = await this.userBotRepository.findOne({
        where: { chatId },
      });

      if (isBot) {
        isBot.idInstance = clientBotData.IdInstance;
        isBot.apiTokenInstance = clientBotData.ApiTokenInstance;
        isBot.name = clientBotData.name;
        await this.userBotRepository.save(isBot);
      } else {
        const userBot = this.userBotRepository.create({
          chatId,
          name: clientBotData.name,
          apiTokenInstance: clientBotData.ApiTokenInstance,
          idInstance: clientBotData.IdInstance,
        });

        await this.userBotRepository.save(userBot);
      }
      await this.textService.sentMessage(
        this.rootCredential.instance,
        this.rootCredential.token,
        `Бот ${clientBotData.name} зарегистрирован`,
        chatId,
      );
    }
  }

  async sentTemplateUserMessage(userBot: UserBot) {
    await this.textService.sentMessage(
      this.rootCredential.instance,
      this.rootCredential.token,
      '#sa:Д:М:ГГГГ:Ч:М:Название чата: ...текст. Важно(в дате и времени не должно быть нуля перед числом - (06)',
      userBot.chatId,
    );
    return;
  }

  async delayedMessage(inputMessageDTO: InputMessageDTO) {
    let content = '';
    let url = '';
    if (inputMessageDTO.messageData.fileMessageData) {
      content = inputMessageDTO.messageData.fileMessageData.caption;
      url = inputMessageDTO.messageData.fileMessageData.downloadUrl;
    } else {
      content = inputMessageDTO.messageData.textMessageData.textMessage;
    }
    console.log(content, '8888');
  }

  public async sentTemplateAddGroup(userBot: UserBot) {
    const { chatId } = userBot;
    await this.textService.sentMessage(
      this.rootCredential.instance,
      this.rootCredential.token,
      `
      В течении 30 секудн отправьте любое сообщение в регистрируемый 
      чат. По истечении этого времени придет ответ
      `,
      chatId,
    );

    setTimeout(async () => {
      const { data } = await this.textService.getLestMessage(
        userBot.idInstance,
        userBot.apiTokenInstance,
      );
      if (data.length) {
        const { chatId } = data[0];
        const { data: dataGroup } = await this.textService.getGroupData(
          userBot.idInstance,
          userBot.apiTokenInstance,
          chatId,
        );
        const newGroupEntity = this.groupRepository.create({
          groupId: chatId,
          groupName: dataGroup.subject,
          userBot,
        });
        const groupEntity = await this.groupRepository.save(newGroupEntity);
        await this.textService.sentMessage(
          this.rootCredential.instance,
          this.rootCredential.token,
          `
      Чат "${groupEntity.groupName}" - успешно зарегистрирован
      `,
          userBot.chatId,
        );
      }
    }, 30000);
  }
}
