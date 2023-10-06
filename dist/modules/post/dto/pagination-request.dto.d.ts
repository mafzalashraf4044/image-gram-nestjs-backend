import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class PaginationRequestDTO {
    cursor: any;
    limit: number;
}
export declare class PaginationTransformPipe implements PipeTransform {
    transform(dto: PaginationRequestDTO, { metatype }: ArgumentMetadata): Promise<any>;
}
