import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RootBotModule } from './modules/root-bot/root-bot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './modules/message/message.module';
import { CreateActionMiddleware } from './common/middlewares/create-actions.middleware';
import { UserBotModule } from './modules/user-bot/user-bot.module';
import { RequestUserMiddleware } from './common/middlewares/request-user.middleware';
import { UserBotRepository } from "./modules/root-bot/user-bot.repository";
import { GroupRepository } from "./modules/root-bot/group.repository";

@Module({
  imports: [
    RootBotModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([UserBotRepository]),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('db'),
      inject: [ConfigService],
    }),
    MessageModule,
    UserBotModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateActionMiddleware).forRoutes('*');
    consumer.apply(RequestUserMiddleware).forRoutes('/root');
  }
}
