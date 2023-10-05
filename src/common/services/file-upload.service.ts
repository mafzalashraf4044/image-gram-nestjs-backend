import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { AWSConfig } from '@common/interfaces';

@Injectable()
export class FileUploadService {
  private readonly s3;

  constructor(private readonly configService: ConfigService) {
    const aws = this.configService.get<AWSConfig>('aws');

    this.s3 = new S3({
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
    });
  }

  async uploadFile(
    dataBuffer: Buffer,
    fileName: string,
    bucket: string,
  ): Promise<string> {
    const result = await this.s3
      .upload({
        Bucket: bucket,
        Body: dataBuffer,
        Key: `${uuid()}-${fileName}`,
      })
      .promise();

    return result.key;
  }
}
