import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByUsername(
    username: string,
    options = {},
  ): Promise<User | undefined> {
    const query = { where: { username }, ...options };

    return this.findOne(query);
  }
}

export default UsersRepository;
