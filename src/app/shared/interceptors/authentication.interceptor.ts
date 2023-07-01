import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  public constructor(private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedRequest =
      request.clone(
        {
          withCredentials: true,
          headers: request.headers.set('X-Requested-With', 'XMLHttpRequest')
        }
      );

    return next.handle(clonedRequest)
      .pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError(error => {
          if (error.status === 401) {
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('tab');
            sessionStorage.removeItem('username');
            this.router.navigateByUrl('/login');
          }
          return throwError(error);
        }));

  }
}

