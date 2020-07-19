import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from 'src/app/cards-module/Services/cards.service';
import {ActivatedRoute} from '@angular/router';
import {Card} from '../../DTOs/Card';
import {CardLevel} from '../../DTOs/CardLevelVisaEnum';
import {CardType} from '../../DTOs/CardTypeEnum';
import {MajorOrSub} from '../../DTOs/MajorOrSubEnum';
import { FormBuilder, Validators } from '@angular/forms';
import { debug } from 'util';
import { CardStatus } from '../../DTOs/CardStatusEnum';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CardLevelMaster } from '../../DTOs/CardLevelMasterEnum';
import { RolesEnum } from 'src/app/DTOs/RolesEnum';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
@Input() ViewCardDetails;
id;
card:Card;
cardLevel:string;
cardType:string;
cardStatus:string;
majorOrSub:string;
cardtNumber:string;
actionsForm:any;
message:string;
cardNumberView:string;
Role:string;

  constructor(private cardService:CardsService,private activrout:ActivatedRoute,private dialog: MatDialog,
     private formbulider: FormBuilder ) { }

  ngOnInit() {
    this.Role =  RolesEnum[localStorage.getItem('userRole')];
    this.id = this.activrout.snapshot.paramMap.get("id");
    this.GetCardDetails();

    this.actionsForm = this.formbulider.group({
      actionOptions:['1',[Validators.required]]
    })
  }

  GetCardDetails()
  {
     this.cardService.getCardDetails(this.id).subscribe(result =>{
      this.card = result;
      this.cardLevel = CardLevel[this.card.cardLevel];
       this.majorOrSub = MajorOrSub[this.card.majorOrSub];
        this.card.cardType = this.card.cardType;
        this.cardStatus = CardStatus[this.card.cardStatus];
        this.card.startDate = this.card.startDate.substring(0,10);
        this.card.cardExpiryDate = this.card.cardExpiryDate.substring(0,10);
        this.card.firstNameOnCard = this.card.firstNameOnCard;
        this.card.secondNameOnCard = this.card.secondNameOnCard;
        this.card.familyNameOnCard = this.card.familyNameOnCard;

        if(this.card.dailyPosLimit == "-1")
          {
            this.card.dailyPosLimit = "غير محدود";
          }
          else{
            this.card.familyNameOnCard = this.card.familyNameOnCard;
          }

        this.card.dailyCashLimit = this.card.dailyCashLimit;
        
        this.card.dailyPosLimit = this.card.dailyPosLimit;

        if(this.Role == "viwer" || this.Role == "systemEmployee")
        {
        this.cardNumberView = this.card.cardNumber.substring(0, 6) + "******" + this.card.cardNumber.substring(12);
        }
        else if (this.Role == "admin")
       {
        this.cardNumberView = this.card.cardNumber;
       }
       
     })
  }

  onFormSubmit(actionsForm)
  {  
 
    if(actionsForm.actionOptions == 1)
    {
       this.replaceCard(this.card);
    }
    else if(actionsForm.actionOptions == 2)
    {
     
     this.renewCard(this.card);
    }
    else if(actionsForm.actionOptions == 3)
    {
     this.regeneratePIN(this.card);
    }
    else if(actionsForm.actionOptions == 4)
    {
     this.closeCard(this.card);
    }
    else if(actionsForm.actionOptions == 5)
    { 
     this.cancelCard(this.card);
    }
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
 
  replaceCard(card)
  {
    this.cardService.replaceCardByCardNumber(card).subscribe(result =>{
      this.message="!تمت عملية اعادة الطباعة بنجاح"
      this.openDialog(this.message);
    }
    ,error => {
      debugger;
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 404: this.message="404 - خطأ بالبيانات!";
              return this.openDialog(this.message);
    
              case 500: this.message="500 - خطأ بالبيانات!";
              return this.openDialog(this.message);
          }
        }
         else {
          return 
        }
    })
  }

  renewCard(card){
    this.cardService.renewCardByCardNumber(card).subscribe(result =>{
      this.message="!بنجاح CCV تم تغيير"
      this.openDialog(this.message);
    },error => {
      debugger;
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 404: this.message="404 - خطأ بالبيانات!";
              return this.openDialog(this.message);
    
              case 500: this.message="500 - خطأ بالبيانات!";
              return this.openDialog(this.message);
          }
        }
         else {
          return 
        }
    })
  }

  regeneratePIN(card){
    this.cardService.regeneratePINByCardNumber(card).subscribe(result =>{
      this.message="!بنجاح PIN تم تغيير"
      this.openDialog(this.message);
    },error => {
      debugger;
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 404: this.message="404 - خطأ بالبيانات!";
              return this.openDialog(this.message);
    
              case 500: this.message="500 - خطأ بالبيانات!";
              return this.openDialog(this.message);
          }
        }
         else {
          return 
        }
    })
  }

  closeCard(card){
    this.cardService.closeCardByCardNumber(card).subscribe(result =>{
      this.message="!تم اغلاق البطاقة"
      this.openDialog(this.message);
    },error => {
      debugger;
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 404: this.message="404 - خطأ بالبيانات!";
              return this.openDialog(this.message);
    
              case 500: this.message="500 - خطأ بالبيانات!";
              return this.openDialog(this.message);
          }
        }
         else {
          return 
        }
    })
  }

  cancelCard(card){
    this.cardService.cancelCardByCardNumber(card).subscribe(result =>{
      this.message="!تم الغاء البطاقة"
      this.openDialog(this.message);
    },error => {
      debugger;
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 404: this.message="404 - خطأ بالبيانات!";
              return this.openDialog(this.message);
    
              case 500: this.message="500 - خطأ بالبيانات!";
              return this.openDialog(this.message);
          }
        }
         else {
          return 
        }
    })
  }
}
