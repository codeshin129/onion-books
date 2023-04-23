import {
  IsDefined,
  IsInt,
  Length,
  Max,
  MaxLength,
  Min,
  IsString,
} from 'class-validator';

export class InputData {
  @IsDefined({
    message: 'id required',
  })
  @MaxLength(10, {
    message: 'id should not be longer than 10 character',
  })
  id: string;

  @IsDefined({
    message: 'title required',
  })
  @IsString({
    message: 'title shoule be string type',
  })
  @Length(1, 128, {
    message:
      'title string length should be between $constraint1 to $constraint2',
  })
  title: string;

  @IsDefined({
    message: 'author required',
  })
  @IsString({
    message: 'author shoule be string type',
  })
  @Length(1, 128, {
    message:
      'author string length should be between $constraint1 to $constraint2',
  })
  author: string;

  @IsDefined({
    message: 'pages required',
  })
  @IsInt({
    message: 'pages should be integer type',
  })
  @Min(0, { message: 'pages should be larger than $constraint1' })
  @Max(Number.MAX_VALUE, {
    message: 'pages should be smaller than $constraint1',
  })
  pages: number;
}
