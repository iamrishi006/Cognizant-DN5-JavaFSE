import { HttpInterceptorFn } from '@angular/common/http';

import { finalize } from 'rxjs/operators';

import { inject } from '@angular/core';

import { LoadingService } from '../services/loading';

export const loadingInterceptor: HttpInterceptorFn=(

req,

next

)=>{

const loadingService=

inject(LoadingService);

loadingService.isLoading$.next(true);

return next(req).pipe(

finalize(()=>{

loadingService.isLoading$.next(false);

})

);

};