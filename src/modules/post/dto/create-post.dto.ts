/** @format */

import { IsNotEmpty, IsString, Length } from 'class-validator';

class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 200)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2000)
  caption: string;
}

export default CreatePostDTO;
