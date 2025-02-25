import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlHelper } from '../_helpers/UrlHelper';

const EVENT_API = UrlHelper.BASE_URL+'/api/event';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  sendEvent(event: any):Observable<any>{

    return this.http.post(EVENT_API, event);

  }

  getEvents():Observable<any>{

    return this.http.get(EVENT_API);

  }

}