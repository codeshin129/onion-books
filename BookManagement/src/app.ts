import express from 'express';
import { connectToDB } from './Database';
import { AddBookRepository } from './Applications/AddBook/Infra/Repository';
import { AddBookController } from './Applications/AddBook/Presentation/Controller';
import { AddBookUseCase } from './Applications/AddBook/UseCase';
import { GetBookRepository } from './Applications/GetBook/Infra/Repository';
import { GetBookController } from './Applications/GetBook/Presentation/Controller';
import { GetBookUseCase } from './Applications/GetBook/UseCase';
import { GetBooksRepository } from './Applications/GetBooks/Infra/Repository';
import { GetBooksController } from './Applications/GetBooks/Presentation/Controller';
import { GetBooksUseCase } from './Applications/GetBooks/UseCase';

const app = express();
app.use(express.json());

connectToDB();

const addBookRepository = new AddBookRepository();
const addBookUseCase = new AddBookUseCase(addBookRepository);
const addBookController = new AddBookController(addBookUseCase);

const getBookRepository = new GetBookRepository();
const getBookUseCase = new GetBookUseCase(getBookRepository);
const getBookController = new GetBookController(getBookUseCase);

const getBooksRepository = new GetBooksRepository();
const getBooksUseCase = new GetBooksUseCase(getBooksRepository);
const getBooksController = new GetBooksController(getBooksUseCase);

app.get('/books', async (req, res) => {
  await getBooksController.getBooks(req, res);
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
