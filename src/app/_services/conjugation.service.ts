import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConjugationService {

  constructor(private http:HttpClient) { }

  getConjugation(verb: string):Observable<any>{
    return this.http.get('http://localhost:3000/conjugations/'+verb);
  }

}
