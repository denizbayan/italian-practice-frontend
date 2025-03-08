import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlHelper } from '../_helpers/UrlHelper';

const CONJUGATION_API = UrlHelper.BASE_URL+'/api/conjugation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ConjugationService {

  constructor(private http:HttpClient) { }

  getConjugation(verb:string):Observable<any>{
    return this.http.get(CONJUGATION_API + "/" + verb);
  }

}
