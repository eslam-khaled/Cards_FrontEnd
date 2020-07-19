import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/cards-module/Services/cards.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ShowHideChild } from './DTOs/ShowHideChilds';
import { MatDialog } from "@angular/material/dialog"
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';


@Component({
  selector: 'app-cards-module',
  templateUrl: './cards-module.component.html',
  styleUrls: ['./cards-module.component.css']
})
export class CardsModuleComponent implements OnInit {

  ShowClientDetails:boolean = false;
  ShowCardDetails:boolean=false
  ShowCardsList:boolean = false;
  toggleViews:ShowHideChild;
  constructor(private formbulider: FormBuilder,private cardsService:CardsService,private dialog: MatDialog) { }

  selectedTypeAccount:boolean = true;
  selectedTypeCard:boolean = false;
  selectedTypeId:boolean = false;
  cardForm :any;
  cardList ;
  card;
  client;
  accountNumber;
  cardNumber;
  identityNumber;
  ClientDetailsForm;
  cardDetailsForm;
  DrpSelectType: number = 1;
  message:string;
  
  ngOnInit() {
    this.cardForm = this.formbulider.group({
      accountNumber:['',[Validators.required]],
      cardNumber:['',[Validators.required]],
      identityNumber:['',[Validators.required]],
      AccessType:['1',[Validators.required]],
      PersoneIdentity:['',[Validators.required]],
      PersoneIdentityType:['',[Validators.required]],
      BirthDate:['',[Validators.required]],
      Address:['',[Validators.required]],
      age:['',[Validators.required]]

    })
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

  onSelectedValueChange(cardForm)
  {
  
   if(cardForm.AccessType == 1) 
   {
   this.selectedTypeAccount = true;
   
   this.selectedTypeCard = false;
   this.selectedTypeId = false;
   }
   else if(cardForm.AccessType == 2)
   {
    this.selectedTypeAccount = false;
    this.selectedTypeCard = true;
    
    this.selectedTypeId = false;
   }
   else if(cardForm.AccessType == 3)
   {
    this.selectedTypeAccount = false;
    this.selectedTypeCard = false;
    this.selectedTypeId = true;
   
   }
  }

  onFormSubmit(cardForm){
 
    if(this.selectedTypeAccount == true && this.selectedTypeCard == false && this.selectedTypeId == false)
    {
      this.DrpSelectType = 1;
      if(cardForm.accountNumber == "" || cardForm.accountNumber.length != 13)
      {
        if(cardForm.accountNumber.length != 6)
        {
        this.message = "!يرجي ادخال رقم حساب صحيح";
        this.openDialog(this.message);
        return;
        }
        
      }
      this.accountNumber = cardForm.accountNumber;
      this.ShowClientDetails = true;
      this.ShowCardsList = true;
    
    }
    else if(this.selectedTypeAccount == false && this.selectedTypeCard == true && this.selectedTypeId == false)
    {
      this.DrpSelectType = 2;
      if(cardForm.cardNumber == "" || cardForm.cardNumber.length != 16)
      {
        this.message = "!يرجي ادخال رقم بطاقة صحيح";
        this.openDialog(this.message);
        return;
      }
      this.cardNumber = cardForm.cardNumber;
      this.ShowClientDetails = true;
      this.ShowCardsList = true;
    }
    else if(this.selectedTypeAccount == false && this.selectedTypeCard == false && this.selectedTypeId == true)
    {
      this.DrpSelectType = 3;
      if(cardForm.identityNumber == "" || cardForm.identityNumber.length != 12)
      {
        this.message = "!يرجي ادخال رقم هوية صحيح";
        this.openDialog(this.message);
        return;
      }
      this.identityNumber = cardForm.identityNumber;
      this.ShowClientDetails = true;
      this.ShowCardsList = true;
    }

  }
  ChildEvent(showHideChild){
  this.ShowCardDetails=showHideChild.ViewCardDetails;
  this.ShowCardsList=showHideChild.ViewCardsList;
  this.ShowClientDetails=showHideChild.ViewClientDetails;
  }

}