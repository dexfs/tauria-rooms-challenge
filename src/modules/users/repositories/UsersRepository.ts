import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ where: { username } });
  }
}

export default UsersRepository;
