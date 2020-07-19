import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../Services/reports.service';
import {CardPrintRequestDto} from '../DTOs/CardPrintRequestDto';

@Component({
  selector: 'app-reports',
  templateUrl: './create-print-file.component.html',
  styleUrls: ['./create-print-file.component.css']
})
export class CreatePrintFileComponent implements OnInit {

  constructor(private reportsService:ReportsService) { }

  requestsList:CardPrintRequestDto[];
  cardNumber:string;

  ngOnInit() {
    this.GetRequestsList();
  }
  
  creatPrintFile()
  {
    debugger;
    this.reportsService.CreatePrintFileEBE().subscribe(result=>{
  });
  window.location.reload();
  }

  GetRequestsList()
  {
    this.reportsService.GetPrintRequestsList().subscribe(result=>{
    this.requestsList = result;
    });
  }
}
