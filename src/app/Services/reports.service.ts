import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../environment';
import {CardPrintRequestDto} from '../DTOs/CardPrintRequestDto';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
   
  
  constructor(private http: HttpClient) { }
  url = environment.api;

  CreatePrintFileEBE()
  {
    return this.http.get(this.url + 'printCard/CreatePrintFileEBE');
  }

  GetPrintRequestsList()
  {
    return this.http.get<CardPrintRequestDto[]>(this.url + 'printCard/GetPrintRequestsList');
  }

  GetAllNewCards()
  {
    return this.http.get<CardPrintRequestDto[]>(this.url + 'printCard/GetAllNewCards');
  }

  CreatePrintRequest()
  {
    return this.http.get(this.url + 'printCard/CreatePrintRequest');
  }
}
