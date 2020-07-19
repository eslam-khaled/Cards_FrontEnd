import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {LoginService} from '../Services/login.service';
import {UserLoginData} from '../DTOs/UserLoginData';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  userData:UserLoginData;
  loginForm:any;
 constructor(private loginService:LoginService,private formbulider: FormBuilder,private router:Router ) { }

  ngOnInit() {

    this.loginForm = this.formbulider.group({
      Email: ['',Validators.required],
      Password:['',Validators.required]
    })
  }

  onFormSubmit(loginForm)
  {
    this.userData = loginForm;
    this.userLoginToken();
  }

userLoginToken()
{
  this.loginService.login(this.userData).subscribe(result=>{
  this.userData = result;
  localStorage.setItem("userToken",this.userData.token);
  localStorage.setItem("userRole",this.userData.userRole);
  
  this.router.navigate(['landing']);
 
  })
}



}
