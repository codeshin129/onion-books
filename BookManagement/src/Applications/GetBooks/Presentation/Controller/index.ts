import express from 'express';
import { Presenter } from '../Presenter';
import { GetBooksUseCase } from '../../UseCase';

export class GetBooksController {
  constructor(private readonly getBooksUseCase: GetBooksUseCase) {}
  getBooks = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const output = new Presenter(res);

    try {
      const books = await this.getBooksUseCase.execute();

      output.sendResponse(200, books);
    } catch (error) {
      if (error instanceof Error) {
        output.sendResponse(500, error.message);
      }
    }
  };
}
