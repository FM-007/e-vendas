import { EntityRepository, Repository } from 'typeorm';
import Users from '../entities/Users';

@EntityRepository(Users)
class UsersRepository extends Repository<Users> {
  public async findByName(name: string): Promise<Users | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<Users | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default UsersRepository;
