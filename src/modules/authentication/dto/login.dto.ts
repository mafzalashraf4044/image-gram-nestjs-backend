import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LogInDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export default LogInDTO;
