import { EntityRepository, Repository } from 'typeorm';
import { Group } from './entity/group.entity';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {}
