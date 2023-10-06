import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreatePostDTO {
  @ApiProperty({
    description: 'The title of the post (2-200 characters).',
    minLength: 2,
    maxLength: 200,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 200)
  title: string;

  @ApiProperty({
    description: 'The caption of the post (2-2000 characters).',
    minLength: 2,
    maxLength: 2000,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2000)
  caption: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;
}

export default CreatePostDTO;
