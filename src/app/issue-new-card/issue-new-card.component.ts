import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardsService } from 'src/app/cards-module/Services/cards.service';
import { Card } from '../cards-module/DTOs/Card';
import {ActivatedRoute} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import {cardLevel} from '../cards-module/DTOs/cardLevel';

@Component({
  selector: 'app-issue-new-card',
  templateUrl: './issue-new-card.component.html',
  styleUrls: ['./issue-new-card.component.css']
})
export class IssueNewCardComponent implements OnInit {
  NewCardForm:any;
  cardLevelMasterView:boolean = true;
  cardLevelVisaView:boolean = false;
  cardLevels:cardLevel [];
  message:string;
  VisaLevels:cardLevel [] =[];
  MasterLevels:cardLevel []= [];
  onLevelVisa:cardLevel=new cardLevel;
  constructor(private formbulider: FormBuilder, private cardService:CardsService, private activerout:ActivatedRoute,
   private dialog: MatDialog) { }
  

  ngOnInit() {
    
    this.NewCardForm = this.formbulider.group({
      cardType:['1',[Validators.required]],
      majorOrSub:['1',[Validators.required]],
      cardLevel:['7',[Validators.required]],
      firstNameOnCard:['',[Validators.required]],
      secondNameOnCard:['',[Validators.required]],
      familyNameOnCard:['',[Validators.required]],
      deliveryBranch:['1',[Validators.required]],
      comment:['',[Validators.required]],
      accountNumber:[this.activerout.snapshot.paramMap.get("accountNumber"),[Validators.required]]

    })
    
    this.getCardExtraDetails();
  }

  onMasterLevelChange(index){
   this.onLevelVisa=this.MasterLevels[index];
  }

  onVisaLevelChange(index){
    this.onLevelVisa=this.VisaLevels[index];
   }

getCardExtraDetails()
{
  this.cardService.GetExtraDetails().subscribe(result=>{
  this.cardLevels = result;

  for (let level = 0; level< 3; level++)
   {
     this.MasterLevels[level] =this.cardLevels[level];
     this.VisaLevels[level]=this.cardLevels[level+3];
    }

  })
}

  ChangeCardType(NewCardForm)
  {
    if(NewCardForm.cardType == "1"){
     this.cardLevelMasterView = true;
     this.cardLevelVisaView = false;
     this.NewCardForm.patchValue({cardLevel:"7"});
    }
    else if (NewCardForm.cardType == "2")
    {
      this.cardLevelMasterView = false;
      this.cardLevelVisaView = true;
     this.NewCardForm.patchValue({cardLevel:"10"});
     
    }

  }

  onFormSubmit(NewCardForm){
 if(NewCardForm.firstNameOnCard == "" || NewCardForm.familyNameOnCard == ""|| NewCardForm.secondNameOnCard == "")
 {
  this.message="!يرجي ادخال الاسم بالكامل"
  this.openDialog(this.message);
  return;
 }

    this.CreateNewCard(NewCardForm);
    window.location.reload();
  }
 
  openDialog(message)
  {
   const dialogRef = this.dialog.open(MessageDialogComponent,{
       width: "380px",
   data: {
     message: message
     }});

   dialogRef.afterClosed().subscribe(result => {

   });
 }
 
  CreateNewCard(NewCardForm)
  {


    this.cardService.addCard(NewCardForm).subscribe(result=>{ 
      this.message="تمت العملية بنجاح."
      this.openDialog(this.message);
    }    ,error => {

        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 404: this.message="404 - خطأ بالبيانات!";
              return this.openDialog(this.message);
    
              case 400: this.message="400 - خطأ بالبيانات!";
              return this.openDialog(this.message);

              case 500: this.message="500 - خطأ بالبيانات!";
              return this.openDialog(this.message);
          }
        }
         else {
          return 
        }
    });
  }

}
