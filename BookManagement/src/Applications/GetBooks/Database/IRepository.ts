import { Book } from '../Domain/Book';

export interface IGetBooksRepository {
  getBooks: () => Promise<Book[]>;
}
