import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsModuleComponent } from './cards-module.component';
import { CardsListComponent } from './Components/cards-list/cards-list.component';
import { CardsModuleRoutingModule } from './cards-module-routing.module';
import { ClientDetailsComponent } from './Components/client-details/client-details.component';
import { MatDialogModule } from "@angular/material/dialog";


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardDetailsComponent } from './Components/card-details/card-details.component';

@NgModule({
  declarations: [CardsModuleComponent, CardsListComponent,ClientDetailsComponent, CardDetailsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    CardsModuleRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class CardsModuleModule { }
