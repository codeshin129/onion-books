import { IAddBookRepository } from '../Database/IRepository';
import { Book } from '../Domain/Book';
import { pool } from '../../../Database';

export class AddBookRepository implements IAddBookRepository {
  addBook = async (book: Book): Promise<Book['id']> => {
    try {
      const { id, title, author, pages } = book;
      const query = {
        text: 'INSERT INTO books(id, title, author, pages) VALUES($1, $2, $3, $4)',
        values: [id, title, author, pages],
      };
      await pool.query(query);

      return id;
    } catch (error) {
      throw new Error('add book failed');
    }
  };
}
