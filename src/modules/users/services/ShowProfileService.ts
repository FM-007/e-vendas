import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
}

class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<Users> {
    const usertsRepository = getCustomRepository(UsersRepository);

    const user = await usertsRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
