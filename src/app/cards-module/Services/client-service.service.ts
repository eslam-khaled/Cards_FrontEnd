import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { client } from '../DTOs/Client';
import {environment} from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  url = environment.api + 'client/'
  cardNumber : string;
  accountNumber: string;
  idNumber:string;

  constructor(private http: HttpClient) { }

  getCientByAccountNumber(accountNumber)
{
  return this.http.get<client>(this.url+"GetClientDetailsByAccountNumber?"+"accountNumber="+accountNumber);
}

getCientByCardNumber(cardNumber)
{
  return this.http.get<client>(this.url+"GetClientDetailsByCardNumber?"+"cardNumber="+cardNumber);
}

getCientByIdentityNumber(identityNumber)
{
  return this.http.get<client>(this.url+"GetClientDetailsByIdentityNumber?"+"identityNumber="+identityNumber);
}

editAddress(client)
{
  let header = new HttpHeaders();
  header.append("Content-Type","application/json; charset=utf-8");
   return this.http.put<client>(this.url +"EditClientAddress", client,{ headers:header});
}



}
