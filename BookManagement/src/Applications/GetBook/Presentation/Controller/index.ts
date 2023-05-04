import express from 'express';
import { InputData } from '../InputData';
import { Presenter } from '../Presenter';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GetBookUseCase } from '../../UseCase';

export class GetBookController {
  constructor(private readonly getBookUseCase: GetBookUseCase) {}
  getBook = async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const output = new Presenter(res);

    try {
      const input = plainToClass(InputData, { ...req.params });

      validate(input).then((errors) => {
        if (!!errors.length) {
          output.sendResponse(400, errors);
          return;
        }
      });

      const book = await this.getBookUseCase.execute(input.id);

      output.sendResponse(200, book);
    } catch (error) {
      if (error instanceof Error) {
        output.sendResponse(500, error.message);
      }
    }
  };
}
