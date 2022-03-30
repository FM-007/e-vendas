import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const usertsRepository = getCustomRepository(CustomerRepository);

    const user = await usertsRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowCustomerService;
