import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<Users> {
    const usersRepository = getCustomRepository(UsersRepository);
    // Validando unique email
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = await hash(password, 8); // Criptografando senha

    const user = await usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
