import { ArgumentsHost, BadRequestException, ExceptionFilter, HttpException, ValidationError } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

type Exception = HttpException | QueryFailedError; // | ValidationError | BadRequestException;

function isHttpException(exception: Exception): exception is HttpException {
  return Boolean((exception as HttpException).getStatus);
}

function getStatus(exception: Exception) {
  if (isHttpException(exception)) {
    return exception.getStatus();
  }
  return 400;
}

function getMessage(exception: Exception) {
  if (isHttpException(exception)) {
    console.log('exception :>> ', exception);
    return exception.message;
  }
  return 'ascascasc';
}

export class FilterException implements ExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost) {
    // return JSON.stringify(exception);
    console.log('exception :>> ', exception.message);
    const response = host.switchToHttp().getResponse<Response>();
    const status = getStatus(exception);

    let message = '';
    if (typeof exception.message === 'string') {
      message = exception.message;
    }
    // @ts-ignore
    else if (Array.isArray(exception.getResponse?.().message)) {
      // @ts-ignore
      message = exception.getResponse().message.join(', ');
    } else if ((exception as QueryFailedError).message) {
      // @ts-ignore
      message = (exception as QueryFailedError).detail;
    } else {
      // @ts-ignore
      message = exception.getResponse().message;
    }
    response.status(status).send(message);
  }
}
