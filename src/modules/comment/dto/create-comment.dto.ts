import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateCommentDTO {
  @ApiProperty({
    description: 'The content of the comment (2-2000 characters).',
    minLength: 2,
    maxLength: 2000,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2000)
  content: string;
}

export default CreateCommentDTO;
