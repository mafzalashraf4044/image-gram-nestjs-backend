import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user.',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

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

export default RegisterDTO;
