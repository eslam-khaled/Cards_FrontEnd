import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../Services/reports.service';
import {CardPrintRequestDto} from '../DTOs/CardPrintRequestDto'

@Component({
  selector: 'app-create-print-request',
  templateUrl: './create-print-request.component.html',
  styleUrls: ['./create-print-request.component.css']
})
export class CreatePrintRequestComponent implements OnInit {

  cardsList:CardPrintRequestDto[];

  constructor(private reportsService:ReportsService) { }
  ngOnInit() {
    this.GetRequestsList();
  }

  GetRequestsList()
  {
    this.reportsService.GetAllNewCards().subscribe(result=>{
    this.cardsList = result;
    });
  }

  createRequestToPrint()
  {
    this.reportsService.CreatePrintRequest().subscribe(result=>{

    });
    window.location.reload();
  }
}
