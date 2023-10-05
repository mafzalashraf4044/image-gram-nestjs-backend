import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance, Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class PaginationRequestDTO {
  @Type(() => String)
  @IsOptional()
  @IsString()
  cursor;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit = 10;
}

@Injectable()
export class PaginationTransformPipe implements PipeTransform {
  async transform(dto: PaginationRequestDTO, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return dto;
    }

    return plainToInstance(metatype, dto);
  }
}
