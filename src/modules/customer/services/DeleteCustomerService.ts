import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowProfileService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found');
    }

    await customerRepository.remove(customer);
  }
}

export default ShowProfileService;
