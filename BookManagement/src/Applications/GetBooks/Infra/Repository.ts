import { IGetBooksRepository } from '../Database/IRepository';
import { Book } from '../Domain/Book';
import { pool } from '../../../Database';

export class GetBooksRepository implements IGetBooksRepository {
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
}
