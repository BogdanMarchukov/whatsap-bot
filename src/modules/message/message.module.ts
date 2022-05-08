import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [TextService],
  exports: [TextService],
})
export class MessageModule {}
