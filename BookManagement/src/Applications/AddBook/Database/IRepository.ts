import { Book } from '../Domain/Book';

export interface IAddBookRepository {
  addBook: (book: Book) => Promise<Book['id']>;
}
