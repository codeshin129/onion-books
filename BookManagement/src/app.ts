import express from 'express';
import { connectToDB, pool } from './Database';
import { AddBookRepository } from './Applications/AddBook/Infra/Repository';
import { AddBookController } from './Applications/AddBook/Presentation/Controller';
import { AddBookUseCase } from './Applications/AddBook/UseCase';
import { GetBookRepository } from './Applications/GetBook/Infra/Repository';
import { GetBookController } from './Applications/GetBook/Presentation/Controller';
import { GetBookUseCase } from './Applications/GetBook/UseCase';

const app = express();
app.use(express.json());

connectToDB();

const addBookRepository = new AddBookRepository();
const addBookUseCase = new AddBookUseCase(addBookRepository);
const addBookController = new AddBookController(addBookUseCase);

const getBookRepository = new GetBookRepository();
const getBookUseCase = new GetBookUseCase(getBookRepository);
const getBookController = new GetBookController(getBookUseCase);

app.get('/books', async (req, res) => {
  const query = {
    text: `SELECT * FROM books`,
  };

  const records = await pool.query(query);

  res.status(200).send(records.rows);
});

app.get('/books/:id', async (req, res) => {
  await getBookController.getBook(req, res);
});

app.post('/books', async (req, res) => {
  await addBookController.addBook(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
