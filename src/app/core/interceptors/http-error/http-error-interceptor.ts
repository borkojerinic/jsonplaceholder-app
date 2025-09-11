import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackBarType } from '@app-enums';
import { SnackBarService } from '@app-shared-services';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBarService = inject(SnackBarService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      snackBarService.displaySnackBar(error.message, SnackBarType.Error);
      return throwError(() => error);
    }),
  );
};
