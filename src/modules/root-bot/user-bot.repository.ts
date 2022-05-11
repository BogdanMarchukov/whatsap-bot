import { EntityRepository, Repository } from 'typeorm';
import { UserBot } from './entity/user-bot.entity';

@EntityRepository(UserBot)
export class UserBotRepository extends Repository<UserBot> {}
