import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class CoreInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone(
            {
                headers: new HttpHeaders(
                    {
                        'Accept': '*;*',
                        'Content-type': 'application/json'
                    }),
                withCredentials: true
            });

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        return next.handle(request)
            .pipe(
                tap((ev: HttpEvent<any>) => {
                    // Intercepting HTTP responses.
                    if (ev instanceof HttpResponse) {
                    }
                }),
                catchError((response) => {
                    // Intercepting HTTP request errors.
                    return Observable.throw(response);
                }),
            );
        // If the call fails, retry until 5 times before throwing an error.
        // .retry(5);
    }
}
