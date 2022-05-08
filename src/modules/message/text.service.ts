import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TextService {
  constructor(private readonly httpService: HttpService) {}
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
}
