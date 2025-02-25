import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlHelper } from '../_helpers/UrlHelper';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';


const AUTH_API = UrlHelper.BASE_URL+'/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {  


  private tokenValidationSubject = new BehaviorSubject<boolean | null>(null);
  public tokenValidation$ = this.tokenValidationSubject.asObservable();


  constructor(private http:HttpClient, private tokenStorageService: TokenStorageService) { }

  signup(form:any):Observable<any>{
    console.log(form)
    return this.http.post(AUTH_API+'/signup',{
      email:form.email,
      username:form.username,
      password:form.password,
    },
    httpOptions)
  }

  signin(form:any) : Observable<any>
  {
    
    return this.http.post(AUTH_API+'/signin',{
      email:form.email,
      password:form.password
    },
    httpOptions)
  }

  async validateToken() {
    try {
      const response = await this.http.get(AUTH_API+'/validateToken',{
        headers: httpOptions.headers,
        observe: 'response' 
      }).toPromise()
      if(response?.status == 200){
        this.tokenValidationSubject.next(true)
      }else{
        this.tokenStorageService.clearStorage();
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      this.tokenStorageService.clearStorage();
      this.tokenValidationSubject.next(false);
    }
  }

}
