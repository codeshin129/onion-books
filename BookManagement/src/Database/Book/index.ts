import { Book } from '../../Domains/Book';
import { pool } from '..';

export class BookRepository {
  getBook = async (id: string): Promise<Book> => {
    try {
      const query = {
        text: `SELECT * FROM books WHERE id = $1`,
        values: [id],
      };

      const records = await pool.query(query);

      return records.rows[0];
    } catch (error) {
      throw new Error('get book failed');
    }
  };

  getBooks = async (): Promise<Book[]> => {
    try {
      const query = {
        text: `SELECT * FROM books`,
      };

      const records = await pool.query(query);

      return records.rows;
    } catch (error) {
      throw new Error('get books failed');
    }
  };

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
