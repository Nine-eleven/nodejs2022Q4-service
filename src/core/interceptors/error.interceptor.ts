import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { RESPONSE_MESSAGE } from '../constants';
import { AddFavoriteItemError } from '../errors/AddFavoriteItemError';
import { NotFoundError } from '../errors/NotFoundError';
import { ForbiddenError } from '../errors/ForbiddenError';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof AddFavoriteItemError) {
          throw new UnprocessableEntityException(err.message);
        } else if (err instanceof NotFoundError) {
          throw new NotFoundException(err.message);
        } else if (err instanceof ForbiddenError) {
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
