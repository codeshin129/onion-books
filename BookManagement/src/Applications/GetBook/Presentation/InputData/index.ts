import { IsDefined, MaxLength } from 'class-validator';

export class InputData {
  @IsDefined({
    message: 'id required',
  })
  @MaxLength(10, {
    message: 'id should not be longer than 10 character',
  })
  id: string;
}
