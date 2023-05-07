import { IGetBookRepository } from '../Database/IRepository';
import { Book } from '../../../Domains/Book';

export class GetBookUseCase {
  constructor(private readonly IGetBookRepository: IGetBookRepository) {}

  execute = async (id: string): Promise<Book> => {
    return this.IGetBookRepository.getBook(id);
  };
}
