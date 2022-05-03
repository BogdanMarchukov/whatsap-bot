import { Injectable } from '@nestjs/common';

@Injectable()
export class RootBotService {
  public createBot() {
    console.log('test');
  }
}
