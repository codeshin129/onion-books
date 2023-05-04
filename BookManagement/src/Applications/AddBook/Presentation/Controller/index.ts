import express from 'express';
import { InputData } from '../InputData';
import { Presenter } from '../Presenter';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AddBookUseCase } from '../../UseCase';

export class AddBookController {
  constructor(private readonly addBookUseCase: AddBookUseCase) {}
  addBook = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const output = new Presenter(res);
    try {
      const input = plainToClass(InputData, { ...req.body });

      validate(input).then((errors) => {
        if (!!errors.length) {
          output.sendResponse(400, errors);
          return;
        }
      });

      const id = await this.addBookUseCase.execute(input);

      output.sendResponse(200, { id });
    } catch (error) {
      if (error instanceof Error) {
        output.sendResponse(500, error.message);
      }
    }
  };
}
