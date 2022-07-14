import { EntityRepository, Repository } from 'typeorm';
import { Messege } from './entity/messege.entity';

@EntityRepository(Messege)
export class MessageRepository extends Repository<Messege> {}
