import { Component, OnInit, Input } from '@angular/core';
import { RolesEnum } from '../DTOs/RolesEnum';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  Role:string;
 
constructor() {
  }

  ngOnChanges(){
  }

  ngOnInit() {
this.Role = RolesEnum[localStorage.getItem('userRole')];
  }
  ngDoCheck(){
    this.Role = RolesEnum[localStorage.getItem('userRole')];
   }

  Logout(){
localStorage.removeItem('userToken');
localStorage.removeItem('userRole');
  }
}
