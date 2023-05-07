import { IAddBookRepository } from '../Database/IRepository';
import { Book } from '../../../Domains/Book';

export class AddBookUseCase {
  constructor(private readonly IAddBookRepository: IAddBookRepository) {}

  execute = async (book: Book): Promise<Book['id']> => {
    return this.IAddBookRepository.addBook(book);
  };
}
