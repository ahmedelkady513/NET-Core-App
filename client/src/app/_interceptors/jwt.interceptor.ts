import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountServices : AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountServices.currentUser$.pipe(take(1)).subscribe({
      next : user =>{
        if(user){
          request = request.clone({
            setHeaders : {
              Authorization: `Bearer ${user.token}`
            }
          })
        }
      }
    })
    return next.handle(request);
  }
}
