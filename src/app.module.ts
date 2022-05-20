import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RootBotModule } from './modules/root-bot/root-bot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './modules/message/message.module';
import { CreateActionMiddleware } from './common/middlewares/create-actions.middleware';

@Module({
  imports: [
    RootBotModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('db'),
      inject: [ConfigService],
    }),
    MessageModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateActionMiddleware).forRoutes('*');
  }
}
