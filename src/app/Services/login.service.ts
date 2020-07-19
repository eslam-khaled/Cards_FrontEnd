import { Injectable } from '@angular/core';
import {UserLoginData} from '../DTOs/UserLoginData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  url = environment.api;

  login(userData)
  {
    let header = new HttpHeaders();
    header.append("Content-Type","application/json; charset=utf-8");
  return this.http.post<UserLoginData>(this.url+"login",userData,{ headers:header});
  }

  logout()
{  
  localStorage.removeItem('userToken');
}

}
