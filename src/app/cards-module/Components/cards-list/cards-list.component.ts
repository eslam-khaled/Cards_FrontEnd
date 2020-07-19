import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { CardsService } from 'src/app/cards-module/Services/cards.service';
import { FormBuilder } from '@angular/forms';
import { ShowHideChild} from'../../DTOs/ShowHideChilds';
import {Router} from '@angular/router';
import {MajorOrSub} from '../../DTOs/MajorOrSubEnum';
import {CardStatus} from '../../DTOs/CardStatusEnum';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import {RolesEnum} from '../../../DTOs/RolesEnum';


@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {
@Input() cardDetailsForm;
cardForm :any;
cardList ;
card;
id:number;
showHideChild:ShowHideChild;
message:string;
Role:string;
majorOrSub:string;
cardStatus:string;
AccountNumber:string;

@Output() ViewCardDetails =new EventEmitter<boolean>();
@Output() ViewCardsList = new EventEmitter<boolean>();
@Input() accountNumber;
@Input() cardNumber;
@Input() identityNumber;
@Input() DrpSelectType;
@Output() toggleViews = new EventEmitter<ShowHideChild>();


constructor(private formbulider: FormBuilder,private cardsService:CardsService,private router:Router,
  private dialog: MatDialog) { 
}
 ngOnInit(){
  this.Role = RolesEnum[localStorage.getItem('userRole')];
 }
  ngOnChanges() {
    if(this.DrpSelectType === 1)
    {
    this.getCardsByAccountNumber(this.accountNumber);
    }
    else if(this.DrpSelectType === 2)
    {
      this.getCardsByCardNumber(this.cardNumber);
    }
    else if(this.DrpSelectType === 3)
    {
      this.getCardsByidNumber(this.identityNumber);

    }
    this.AccountNumber=this.accountNumber;

   }
 
  showDetails()
  {
    this.showHideChild={"ViewCardsList":false,"ViewCardDetails":true,"ViewClientDetails":false}
    this.toggleViews.next(this.showHideChild);
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
 
  GoToIssueNewCard(){ 
   
    this.router.navigate(['Cards/issue-new-card',this.AccountNumber]);
  }
  getCardsByAccountNumber(accountNumber)
  {
    
    this.cardsService.getCardsByAccountNumber(accountNumber).subscribe(result =>{
       this.cardDetailsForm = result;
       this.accountNumber = this.cardDetailsForm.accountNumber;
       for(let CardsOfList =0;CardsOfList<=this.cardDetailsForm.length;CardsOfList++){
        this.cardDetailsForm[CardsOfList].majorOrSub=MajorOrSub[this.cardDetailsForm[CardsOfList].majorOrSub];
        this.cardDetailsForm[CardsOfList].cardStatus = CardStatus[this.cardDetailsForm[CardsOfList].cardStatus];
        this.cardDetailsForm[CardsOfList].startDate = this.cardDetailsForm[CardsOfList].startDate.substring(0,10);
        this.cardDetailsForm[CardsOfList].cardExpiryDate = this.cardDetailsForm[CardsOfList].cardExpiryDate.substring(0,10);

        console.log(this.Role);
        if(this.Role == "viwer" || this.Role == "systemEmployee")
        {
          this.cardDetailsForm[CardsOfList].cardNumber = this.cardDetailsForm[CardsOfList].cardNumber.substring(0, 6) + "******" + this.cardDetailsForm[CardsOfList].cardNumber.substring(12);
        }
        else if(this.Role == "admin")
        {
          this.cardDetailsForm[CardsOfList].cardNumber = this.cardDetailsForm[CardsOfList].cardNumber;
        }
        
       }
    },error => {
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

  getCardsByCardNumber(cardNumber)
  {
    
    this.cardsService.getCardsByCardNumber(cardNumber).subscribe(result =>{
      this.cardDetailsForm=result;
      this.cardNumber = this.cardDetailsForm.cardNumber;
      this.AccountNumber = this.cardDetailsForm[0].accountNumber;

      for(let CardsOfList =0; CardsOfList<=this.cardDetailsForm.length; CardsOfList++){
       this.cardDetailsForm[CardsOfList].majorOrSub=MajorOrSub[this.cardDetailsForm[CardsOfList].majorOrSub];
       this.cardDetailsForm[CardsOfList].cardStatus = CardStatus[this.cardDetailsForm[CardsOfList].cardStatus];
       this.cardDetailsForm[CardsOfList].startDate = this.cardDetailsForm[CardsOfList].startDate.substring(0,10);
       this.cardDetailsForm[CardsOfList].cardExpiryDate = this.cardDetailsForm[CardsOfList].cardExpiryDate.substring(0,10);
      }

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
    }
   )
  }

  getCardsByidNumber(identityNumber)
  {
    this.cardsService.getCardsByIdNumber(identityNumber).subscribe(result =>{
      this.cardDetailsForm = result;
      this.cardNumber = this.cardDetailsForm.identityNumber;
      this.AccountNumber = this.cardDetailsForm[0].accountNumber;
      
      for(let CardsOfList =0;CardsOfList<=this.cardDetailsForm.length;CardsOfList++){

       this.cardDetailsForm[CardsOfList].majorOrSub = MajorOrSub[this.cardDetailsForm[CardsOfList].majorOrSub];
       this.cardDetailsForm[CardsOfList].cardStatus = CardStatus[this.cardDetailsForm[CardsOfList].cardStatus];
       this.cardDetailsForm[CardsOfList].startDate = this.cardDetailsForm[CardsOfList].startDate.substring(0,10);
       this.cardDetailsForm[CardsOfList].cardExpiryDate = this.cardDetailsForm[CardsOfList].cardExpiryDate.substring(0,10);
     
      }

   })
  }
  GoToCardDetails(id){
    this.router.navigate(['Cards/card-details',id]);
  }
}
