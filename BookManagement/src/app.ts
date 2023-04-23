import express from 'express';
import { connectToDB, pool } from './Database';
import { v4 } from 'uuid';
import { AddBookRepository } from './Applications/AddBook/Infra/Repository';
import { AddBookUseCase } from './Applications/AddBook/UseCase';
import { AddBookController } from './Applications/AddBook/Presentation/Controller';

const app = express();
app.use(express.json());

connectToDB();

const addBookRepository = new AddBookRepository();
const addBookUseCase = new AddBookUseCase(addBookRepository);
const addBookController = new AddBookController(addBookUseCase);

app.get('/books', async (req, res) => {
  const query = {
    text: `SELECT * FROM books`,
  };

  const records = await pool.query(query);

  res.status(200).send(records.rows);
});

app.get('/books/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const query = {
    text: `SELECT * FROM books WHERE id = $1`,
    values: [bookId],
  };

  const records = await pool.query(query);

  res.status(200).send(records.rows[0]);
});

app.post('/books', async (req, res) => {
  await addBookController.addBook(req, res);
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
