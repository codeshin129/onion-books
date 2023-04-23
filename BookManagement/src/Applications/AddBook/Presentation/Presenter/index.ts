import express from 'express';

export class Presenter {
  constructor(private readonly res: express.Response) {}

  sendResponse(statusCode: number, resData: any): void {
    this.res.status(statusCode).send(resData);
  }
}
