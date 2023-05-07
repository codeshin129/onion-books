import { Book } from '../../../Domains/Book';

export interface IGetBookRepository {
  getBook: (id: string) => Promise<Book>;
}
