import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

interface ContactType {
  displayName: string;
  vcard: string;
}

interface LestMessageType {
  idMessage: string;
  timestamp: Date;
  statusMessage: string;
  typeMessage: string;
  chatId: string;
  textMessage: string;
  downloadUrl: string;
  caption: string;
  location: any;
  contact: ContactType;
  extendedTextMessage: any;
}

interface ParticipantsType {
  id: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

interface GroupDataType {
  groupId: string;
  owner: string;
  subject: string;
  creation: number;
  participants: ParticipantsType[];
  subjectTime: number;
  subjectOwner: string;
  groupInviteLink: string;
}

@Injectable()
export class TextService {
  private userWebhookUrl = this.configService.get<string>('userWebhookUrl');
  private readonly logger = new Logger();
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async sentMessage(
    idInstance: string,
    token: string,
    message: string,
    chatId: string,
  ) {
    this.httpService
      .post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${token}`,
        {
          chatId,
          message,
        },
      )
      .subscribe();
  }

  async sentImageAndMessage(
    idInstance: string,
    token: string,
    message: string,
    chatId: string,
    imageUrl: string,
  ) {
    const fileName = imageUrl.split('/');
    console.log(fileName[fileName.length - 1]);
    const observer = this.httpService.post(
      `https://api.green-api.com/waInstance${idInstance}/SendFileByUrl/${token}
`,
      {
        chatId,
        urlFile: imageUrl,
        fileName: fileName[fileName.length - 1],
        caption: message,
      },
    );
    observer.pipe(
      catchError((err, caught) => {
        if (err) {
          this.logger.log(err, 'Error register');
        }
        return caught;
      }),
    );
    return firstValueFrom<AxiosResponse>(observer);
  }

  async registerWebhook(idInstance: string, token: string) {
    const observer = this.httpService.post(
      `https://api.green-api.com/waInstance${idInstance}/SetSettings/${token}`,
      {
        webhookUrl: `${this.userWebhookUrl}`,
        webhookUrlToken: `${token}`,
        outgoingWebhook: 'yes',
        stateWebhook: 'yes',
        incomingWebhook: 'yes',
        deviceWebhook: 'no',
      },
    );
    observer.pipe(
      catchError((err, caught) => {
        if (err) {
          this.logger.log(err, 'Error register');
        }
        return caught;
      }),
    );
    return firstValueFrom<AxiosResponse>(observer);
  }

  getLestMessage(
    idInstance: string,
    token: string,
  ): Promise<AxiosResponse<LestMessageType[]>> {
    const observer = this.httpService.get(
      `
      https://api.green-api.com/waInstance${idInstance}/LastOutgoingMessages/${token}
`,
    );
    observer.pipe(
      catchError((err, caught) => {
        if (err) {
          this.logger.log(err, 'Error register');
        }
        return caught;
      }),
    );
    return firstValueFrom<AxiosResponse>(observer);
  }

  getGroupData(
    idInstance: string,
    token: string,
    groupId: string,
  ): Promise<AxiosResponse<GroupDataType>> {
    const observer = this.httpService.post(
      `
      https://api.green-api.com/waInstance${idInstance}/GetGroupData/${token}
`,
      {
        groupId,
      },
    );
    observer.pipe(
      catchError((err, caught) => {
        if (err) {
          this.logger.log(err, 'Error register');
        }
        return caught;
      }),
    );
    return firstValueFrom<AxiosResponse>(observer);
  }
}
