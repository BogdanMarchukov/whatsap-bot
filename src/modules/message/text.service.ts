import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

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
}
