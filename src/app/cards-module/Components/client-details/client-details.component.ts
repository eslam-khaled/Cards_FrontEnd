import { Component, OnInit, Input } from '@angular/core';
import { ClientServiceService } from 'src/app/cards-module/Services/client-service.service';
import { client } from 'src/app/cards-module/DTOs/Client';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {catchError} from "rxjs/operators"
import { from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../../message-dialog/message-dialog.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  @Input() ClientDetailsForm;
  @Input()  accountNumber;
  @Input() cardNumber;
  @Input() identityNumber;
  @Input() DrpSelectType;
  ClientAddressForm:any;
  client;
  message:string;

  constructor(private formbulider: FormBuilder,private clientService : ClientServiceService,private dialog: MatDialog) {
   }
   
   ngOnInit(){}
  ngOnChanges() {
    if(this.DrpSelectType == 1)
    {
      this.getCientDetailsByAccountNumber(this.accountNumber);
    }
    else if(this.DrpSelectType == 2)
    {
      this.getCientDetailsByCardNumber(this.cardNumber);
    }
    else if(this.DrpSelectType == 3)
    {
      this.getCientDetailsByIdentityNumber(this.identityNumber);
    }

    this.ClientAddressForm = this.formbulider.group({
      Address:['',[Validators.required]]
    })
  }

  getCientDetailsByAccountNumber(accountNumber){
    this.clientService.getCientByAccountNumber(accountNumber).subscribe(result=>{
    this.ClientDetailsForm = result;
    this.ClientDetailsForm.birthDate = this.ClientDetailsForm.birthDate.substring(0,10);
    this.client= {"accountNumber":accountNumber}
   },error => {
    debugger;
      if (error instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>error).status) {
          case 404: this.message = "404 - خطأ بالبيانات!";
            return this.openDialog(this.message);
  
            case 500: this.message = "500 - خطأ بالبيانات!";
            return this.openDialog(this.message);
        }
      }
       else {
        return 
      }
  })
  }

  getCientDetailsByCardNumber(cardNumber){
    this.clientService.getCientByCardNumber(cardNumber).subscribe(result=>{
    this.ClientDetailsForm = result;
    this.ClientDetailsForm.birthDate = this.ClientDetailsForm.birthDate.substring(0,10);
    this.client.accountNumber = this.ClientDetailsForm.accountNumber;
    })
  }

  getCientDetailsByIdentityNumber(identityNumber){
  
    this.clientService.getCientByIdentityNumber(identityNumber).subscribe(result=>{
    this.ClientDetailsForm = result;
    this.ClientDetailsForm.birthDate = this.ClientDetailsForm.birthDate.substring(0,10);
    this.client.accountNumber = this.ClientDetailsForm.accountNumber;
   
    })
  }

  onFormSubmit(ClientAddressForm)
  {
    if(ClientAddressForm.Address == "")
    {
      this.message="!يرجي ادخال عنوان صحيح";
      this.openDialog(this.message);
     return;
    }
    // else if(ClientAddressForm.Address == ClientAddressForm.Address)
    // {
    //   this.message="!لم تقم بتحديث جديد بالعنوان";
    //   this.openDialog(this.message);
    //   return;
    // }

     this.editClientAddress(ClientAddressForm.Address);
   
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
 


  editClientAddress(Address)
  {

    this.client= {"accountNumber":this.accountNumber,"Address":Address}
    this.clientService.editAddress(this.client).subscribe(result=>{ 
      this.message = "تم تعديل العنوان بنجاح.";
      this.openDialog(this.message);

},error => {
  debugger;
    if (error instanceof HttpErrorResponse) {
      switch ((<HttpErrorResponse>error).status) {
        case 404: this.message = "404 - خطأ بالبيانات!";
          return this.openDialog(this.message);

          case 500: this.message = "500 - خطأ بالبيانات!";
          return this.openDialog(this.message);
      }
    }
     else {
      return 
    }
});
  
  }
}
