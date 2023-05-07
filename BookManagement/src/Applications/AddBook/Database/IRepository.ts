import { Book } from '../../../Domains/Book';

export interface IAddBookRepository {
  addBook: (book: Book) => Promise<Book['id']>;
}
