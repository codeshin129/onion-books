import express from 'express';
import { connectToDB } from './Database';
import { BookRepository } from './Database/Book';
import { AddBookController } from './Applications/AddBook/Presentation/Controller';
import { AddBookUseCase } from './Applications/AddBook/UseCase';
import { GetBookController } from './Applications/GetBook/Presentation/Controller';
import { GetBookUseCase } from './Applications/GetBook/UseCase';
import { GetBooksController } from './Applications/GetBooks/Presentation/Controller';
import { GetBooksUseCase } from './Applications/GetBooks/UseCase';

const app = express();
app.use(express.json());

connectToDB();

const bookRepository = new BookRepository();
const addBookUseCase = new AddBookUseCase(bookRepository);
const addBookController = new AddBookController(addBookUseCase);

const getBookUseCase = new GetBookUseCase(bookRepository);
const getBookController = new GetBookController(getBookUseCase);

const getBooksUseCase = new GetBooksUseCase(bookRepository);
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
