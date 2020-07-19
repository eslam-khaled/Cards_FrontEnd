import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { client } from '../DTOs/Client';
import { Card } from 'src/app/cards-module/DTOs/Card';
import { debug } from 'util';
import {GeneralService} from '../../GeneralService';
import { from } from 'rxjs';
import {cardLevel} from '../../../app/cards-module/DTOs/cardLevel';
import {environment} from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  
  url = environment.api + 'card/';
  cardNumber : string;
  accountNumber: string;
  idNumber:string;
  constructor(private http: HttpClient) { }

  addCard(card)
  {
   let header = new HttpHeaders();
    header.append("Content-Type","application/json; charset=utf-8");
     return this.http.post<Card>(this.url , card,{ headers:header});
  }



getCardsByAccountNumber(accountNumber)
{
  return this.http.get<Card[]>(this.url + "GetCardsByAccountNumber?"+"accountNumber="+accountNumber);
}

getCardsByCardNumber(cardNumber:string)
{
  return this.http.get<Card[]>(this.url + "GetCardsByCardNumber?"+"cardNumber="+cardNumber);
}

getCardsByIdNumber(identityNumber:string)
{
  return this.http.get<Card[]>(this.url + "GetCardsByIdentityNumber?"+"identityNumber="+identityNumber);
}

getCardDetails(id:number)
{
return this.http.get<Card>(this.url + "GetCardDetailsById?"+"id="+id)
}


replaceCardByCardNumber(card)
{
   
 let header = new HttpHeaders();
  header.append("Content-Type","application/json; charset=utf-8");
   return this.http.put<Card>(this.url +"ReplaceCardByCardNumber", card,{ headers:header});
}

renewCardByCardNumber(card)
{
   
 let header = new HttpHeaders();
  header.append("Content-Type","application/json; charset=utf-8");
   return this.http.put<Card>(this.url + "ReNewByCardNumber" , card,{ headers:header});
}

regeneratePINByCardNumber(card)
{
 let header = new HttpHeaders();
  header.append("Content-Type","application/json; charset=utf-8");
   return this.http.put<Card>(this.url + "ReGenerateByCardNumber" , card,{ headers:header});
}

closeCardByCardNumber(card)
{
 let header = new HttpHeaders();
  header.append("Content-Type","application/json; charset=utf-8");
   return this.http.put<Card>(this.url + "CloseCard", card,{ headers:header});
}

cancelCardByCardNumber(card)
{
 let header = new HttpHeaders();
  header.append("Content-Type","application/json; charset=utf-8");
   return this.http.put<Card>(this.url + "CancelCard" , card,{ headers:header});
}

GetExtraDetails()
{
   return this.http.get<cardLevel[]>(this.url + "GetNewCardExtraInfo");
}

}
