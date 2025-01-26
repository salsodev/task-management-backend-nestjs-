import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class UniqueConstraintExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    // const request: Request = host.switchToHttp().getRequest();

    if (exception.code === '23505') {
      const duplicateName = exception.detail?.split('=')[1]?.split(' ')[0];

      response.status(409).json({ message: `${duplicateName} already exists` });
    } else {
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
