import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumUserRoles } from '../_structs/enums/enum.user_roles';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USERNAME = 'user-name';



@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  clearStorage():void
  {
    window.sessionStorage.clear();
  }

  public saveItem(key: string, value: string){
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key,value);
  }

  public getItem(key: string):string{
    return  window.sessionStorage.getItem(key)!
  }

  public getHighestRole():any
  {
    var user = JSON.parse(window.sessionStorage.getItem(USER_KEY)!)

    if(user.roles.includes("ROLE_ADMIN")) return EnumUserRoles.ROLE_ADMIN
    if(user.roles.includes("ROLE_PLAYER")) return EnumUserRoles.ROLE_PLAYER
    return ;
  }


}
