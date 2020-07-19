import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsModuleComponent } from './cards-module.component';
import {CardDetailsComponent} from 'src/app/cards-module/Components/card-details/card-details.component';


const routes: Routes = [
    {path:'', component:CardsModuleComponent},
    {path:'card-details/:id', component:CardDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsModuleRoutingModule { }
