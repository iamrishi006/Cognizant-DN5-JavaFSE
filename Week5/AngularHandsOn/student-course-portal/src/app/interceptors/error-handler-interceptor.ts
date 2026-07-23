import { HttpInterceptorFn } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

export const errorHandlerInterceptor: HttpInterceptorFn = (

  req,

  next

) => {

  const router = inject(Router);

  return next(req).pipe(

    catchError(error => {

      if (error.status === 401) {

        router.navigate(['/']);

      }

      if (error.status === 500) {

        alert('Internal Server Error');

      }

      return throwError(() => error);

    })

  );

};