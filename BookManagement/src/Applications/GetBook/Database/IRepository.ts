import { Book } from '../Domain/Book';

export interface IGetBookRepository {
  getBook: (id: string) => Promise<Book>;
}
