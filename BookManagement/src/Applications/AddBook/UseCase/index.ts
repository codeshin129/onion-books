import { IAddBookRepository } from '../Database/IRepository';
import { Book } from '../Domain/Book';

export class AddBookUseCase {
  constructor(private readonly IAddBookRepository: IAddBookRepository) {}

  execute = async (book: Book): Promise<Book['id']> => {
    return await this.IAddBookRepository.addBook(book);
  };
}
