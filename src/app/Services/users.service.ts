import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {userRole} from '../../app/DTOs/userRole';
import {environment} from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

url = environment.api + 'Login/CreateNewUser';

addNewUser(newUser)
{
  console.log(newUser);
let header = new HttpHeaders();
header.append("Content-Type","application/json; charset=utf-8");
return this.http.post<userRole>(this.url,newUser,{headers:header});
}

}
