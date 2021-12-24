import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/products';
import ProducstRepository from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProducstRepository);

    const products = await productsRepository.find();

    return products;
  }
}

export default ListProductService;
