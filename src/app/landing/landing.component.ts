import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
Refreshed:boolean = false;
ref:number = 1;
  constructor(private router:Router ) { }

  ngOnInit() {

  }
goTo(event){
  this.router.navigate([event]);
}
}
