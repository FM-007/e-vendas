import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import authConfig from '../../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    // Validando unique email
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email / password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password); // Comparando senha sem cripto com senha cripo

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email / password combination', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiredIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
