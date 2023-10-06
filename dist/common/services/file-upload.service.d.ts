/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export declare class FileUploadService {
    private readonly configService;
    private readonly s3;
    constructor(configService: ConfigService);
    uploadFile(dataBuffer: Buffer, fileName: string, bucket: string): Promise<string>;
}
