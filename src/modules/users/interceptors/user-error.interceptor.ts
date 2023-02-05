import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { RESPONSE_MESSAGE } from '../../../core/constants';

@Injectable()
export class UserErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (
          err instanceof Error &&
          err.message === RESPONSE_MESSAGE.USER_WITH_THIS_UUID_DOESNT_EXIST
        ) {
          throw new NotFoundException(
            RESPONSE_MESSAGE.USER_WITH_THIS_UUID_DOESNT_EXIST,
          );
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
