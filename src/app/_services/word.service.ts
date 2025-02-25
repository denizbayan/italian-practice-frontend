import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http:HttpClient) { }
  


  getWord(level: string):Observable<any>{
    let params = new HttpParams();
    
    // Append each key-value pair to the params

    params = params.set("level", level);

    return this.http.get('http://localhost:8080/api/word/getWords' , { params });
  }
}