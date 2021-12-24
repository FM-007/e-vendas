import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UsersRepository';

class ListUsersService {
  public async execute(): Promise<Users[]> {
    const usertsRepository = getCustomRepository(UsersRepository);

    const users = await usertsRepository.find();

    return users;
  }
}

export default ListUsersService;
