import { IGetBookRepository } from '../Database/IRepository';
import { Book } from '../Domain/Book';
import { pool } from '../../../Database';

export class GetBookRepository implements IGetBookRepository {
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
}
