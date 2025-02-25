import {HTTP_INTERCEPTORS,HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs'
import {HttpInterceptor,HttpHandler,HttpRequest} from '@angular/common/http';
import {TokenStorageService} from '../_services/token-storage.service';
import { EnumSessionStorageKeys } from '../_structs/enums/enum.session_storage_keys';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private tokenStorageService : TokenStorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req
        const token = this.tokenStorageService.getItem(EnumSessionStorageKeys.TOKEN)
        if(token !=null){
            authReq = req.clone({headers:req.headers.set(TOKEN_HEADER_KEY,'Bearer ' +token)})
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];