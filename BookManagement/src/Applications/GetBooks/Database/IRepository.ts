import { Book } from '../../../Domains/Book';

export interface IGetBooksRepository {
  getBooks: () => Promise<Book[]>;
}
