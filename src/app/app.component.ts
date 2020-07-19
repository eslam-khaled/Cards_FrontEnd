import { Component } from '@angular/core';
import { RolesEnum } from './DTOs/RolesEnum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'CardsFrontEnd';
  Role:string;
  RoleAdminFlag:boolean = false;

ngOnInit()
{
    
  this.Role = RolesEnum[localStorage.getItem('userRole')];

  if(this.Role === "admin")
  {
    this.RoleAdminFlag = true;
  }
}

}
