import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RootCredentialType } from '../../config/configuration';
import { TextService } from '../message/text.service';
import { UserBotRepository } from './user-bot.repository';
import { UserBot } from './entity/user-bot.entity';
import { GroupRepository } from './group.repository';
import { InputMessageDTO } from '../../common/dto/notification.dto';
import { DateTime } from 'luxon';
import { MessageRepository } from './message.repository';
import { Cron } from '@nestjs/schedule';

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
    private readonly messageRepository: MessageRepository,
  ) {}
  private rootCredential =
    this.configService.get<RootCredentialType>('rootCredential');

  @Cron('*/1 * * * *')
  public async checkEvent() {
    const time = DateTime.local().setZone('Europe/Moscow');
    const userMessage = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.userBot', 'userBot')
      .where('message.when < :time', { time })
      .getMany();
    if (userMessage.length) {
      for (const messege of userMessage) {
        const { userBot, groupId, text, imageUrl, id } = messege;
        const group = await this.groupRepository.findOne({ id: groupId });
        const result = await this.textService.sentImageAndMessage(
          userBot.idInstance,
          userBot.apiTokenInstance,
          text,
          group.groupId,
          imageUrl,
        );
        if (result.status === 200) {
          await this.messageRepository.delete({ id });
        }
      }
    }
  }

  public async helperText(chatId: string) {
    await await this.textService.sentMessage(
      this.rootCredential.instance,
      this.rootCredential.token,
      `
      #r - Регистрация бота
      #g - Pеистрация чата
      #s - Шаблон сообщения
      `,
      chatId,
    );
  }

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

  async sentTemplateUserMessage(chatId: string) {
    await this.textService.sentMessage(
      this.rootCredential.instance,
      this.rootCredential.token,
      '#sa:Д:М:ГГГГ:Ч:М:Название чата: ...текст. Важно(в дате и времени не должно быть нуля перед числом - (06)',
      chatId,
    );
    return;
  }

  async delayedMessage(inputMessageDTO: InputMessageDTO, userBot: UserBot) {
    let content = '';
    let url = '';
    if (inputMessageDTO.messageData.fileMessageData) {
      content = inputMessageDTO.messageData.fileMessageData.caption;
      url = inputMessageDTO.messageData.fileMessageData.downloadUrl;
    } else {
      content = inputMessageDTO.messageData.textMessageData.textMessage;
    }

    const splitContent = content.split(':');
    const date = DateTime.local(
      +splitContent[3],
      +splitContent[2],
      +splitContent[1],
      +splitContent[4],
      +splitContent[5],
    ).setZone('Europe/Moscow');
    if (!date.isValid) {
      await this.textService.sentMessage(
        this.rootCredential.instance,
        this.rootCredential.token,
        'нет даты отправки сообщения',
        userBot.chatId,
      );
      return;
    }
    const group = await this.groupRepository.findOne({
      where: {
        groupName: splitContent[6],
        userBot,
      },
    });
    if (!group) {
      await this.textService.sentMessage(
        this.rootCredential.instance,
        this.rootCredential.token,
        'группа не зарегистрированна',
        userBot.chatId,
      );
      return;
    }
    const messegeEntity = this.messageRepository.create({
      groupId: group.id,
      text: splitContent[7],
      imageUrl: url ? url : null,
      when: date.toSQL(),
      userBot,
    });
    await this.messageRepository.save(messegeEntity);
    await this.textService.sentMessage(
      this.rootCredential.instance,
      this.rootCredential.token,
      'ok',
      userBot.chatId,
    );
    return;
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
