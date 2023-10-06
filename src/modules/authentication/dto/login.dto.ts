import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogInDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user.',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'mysecretpassword',
    description: "The user's password (min length: 7 characters).",
    minLength: 7,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export default LogInDTO;
