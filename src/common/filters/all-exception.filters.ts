import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

import { SOMETHING_WENT_WRONG } from '@common/errors';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger('exception.filter');
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Handle HTTP exceptions (e.g., BadRequestException, UnauthorizedException)
    if (exception instanceof HttpException) {
      const error: any = exception.getResponse();
      const status = exception.getStatus();
      const message = Array.isArray(error.message)
        ? error.message[0]
        : error.message;

      this.logger.error(error.stack ? error.stack : error);

      response.status(status).json({
        statusCode: status,
        message,
      });
    } else {
      // Handle non-HTTP exceptions (e.g., custom application errors)
      this.logger.error(exception.stack ? exception.stack : exception);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: SOMETHING_WENT_WRONG,
      });
    }
  }
}
