import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { RESPONSE_MESSAGE } from '../constants';

const NOT_FOUND_MESSAGES = [
  RESPONSE_MESSAGE.TRACK_WITH_THIS_UUID_DOESNT_EXIST,
  RESPONSE_MESSAGE.USER_WITH_THIS_UUID_DOESNT_EXIST,
  RESPONSE_MESSAGE.ARTIST_WITH_THIS_UUID_DOESNT_EXIST,
];

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (
          err instanceof Error &&
          NOT_FOUND_MESSAGES.some((message) => message === err.message)
        ) {
          throw new NotFoundException(err.message);
        } else if (
          err instanceof Error &&
          err.message ===
            RESPONSE_MESSAGE.YOU_ENTERED_THE_WRONG_CURRENT_PASSWORD
        ) {
          throw new ForbiddenException(
            RESPONSE_MESSAGE.YOU_ENTERED_THE_WRONG_CURRENT_PASSWORD,
          );
        } else {
          throw err;
        }
      }),
    );
  }
}
