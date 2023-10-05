/** @format */

import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';

import { IsMongoId } from '@common/validators';

class CreateCommentDTO {
  @IsNotEmpty()
  @Validate(IsMongoId)
  post: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2000)
  content: string;
}

export default CreateCommentDTO;
