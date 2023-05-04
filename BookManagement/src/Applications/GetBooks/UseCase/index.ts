import { IGetBooksRepository } from '../Database/IRepository';
import { Book } from '../Domain/Book';

export class GetBooksUseCase {
  constructor(private readonly IGetBooksRepository: IGetBooksRepository) {}

  execute = async (): Promise<Book[]> => {
    return this.IGetBooksRepository.getBooks();
  };
}
