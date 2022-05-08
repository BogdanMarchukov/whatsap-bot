import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TextService {
  constructor(private readonly httpService: HttpService) {}
  sentMessage(
    idInstance: string,
    token: string,
    message: string,
    chatId: string,
  ) {
    this.httpService.post(
      `https://api.green-api.com/waInstance${idInstance}/SendMessage/${token}`,
      {
        body: { chatId, message },
      },
    );
  }
}
