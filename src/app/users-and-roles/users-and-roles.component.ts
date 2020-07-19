import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {UsersService} from '../Services/users.service'
import {userRole} from '../../app/DTOs/userRole';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-users-and-roles',
  templateUrl: './users-and-roles.component.html',
  styleUrls: ['./users-and-roles.component.css']
})
export class UsersAndRolesComponent implements OnInit {

  userForm:any;
newUser:userRole;
message:string;

  constructor(private formbulider: FormBuilder, private userService:UsersService,private dialog: MatDialog) { }

  ngOnInit() {
this.userForm = this.formbulider.group({
  userRoles:['1',Validators.required],
  userName:['',Validators.required],
  password:['',Validators.required],
  Email:['',Validators.required]
})
  }

  onFormSubmit(userForm)
  {
   if(userForm.userRoles == "" || userForm.userName == "" || userForm.password == "" || userForm.Email == "")
   {
    this.message="!يرجي ادخال جميع البيانات بالكامل"
    this.openDialog(this.message);
    return;
   }
   this.createNewUser();
  }

createNewUser()
{ 
  this.newUser = this.userForm.value;
  this.userService.addNewUser(this.newUser).subscribe(result=>{
    this.message="!تم اضافه مستخدم جديد بنجاح"
      this.openDialog(this.message);
  });
}

openDialog(message)
{
 const dialogRef = this.dialog.open(MessageDialogComponent,{
     width: "380px",
 data: {
   message: message
   }});

}


}
