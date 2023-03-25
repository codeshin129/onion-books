import express from 'express';
import dotenv from 'dotenv';
import { v4 } from 'uuid';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};
connectToDB();

const app = express();
app.use(express.json());

app.get('/books', async (req, res) => {
  const query = {
    text: `SELECT * FROM books`,
  };

  const records = await pool.query(query);

  res.status(200).send(records.rows);
});

app.get('/books/:bookId', async (req, res) => {
  const { bookId } = req.params;
  console.log('aabbb');
  const query = {
    text: `SELECT * FROM books WHERE id = $1`,
    values: [bookId],
  };

  const records = await pool.query(query);

  res.status(200).send(records.rows[0]);
});

app.post('/books', async (req, res) => {
  const { id, title, author, pages } = req.body;

  const bookId = id ?? v4();

  try {
    const query = {
      text: 'INSERT INTO books(id, title, author, pages) VALUES($1, $2, $3, $4)',
      values: [bookId, title, author, pages],
    };

    await pool.query(query);

    res.status(200).send({ id: bookId });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
