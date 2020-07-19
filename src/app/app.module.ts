import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CardsService } from 'src/app/cards-module/Services/cards.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RecieveReportComponent } from './recieve-report/recieve-report.component';
import { CreatePrintFileComponent } from './create-print-file/create-print-file.component';
import { LandingComponent } from './landing/landing.component';
import { IssueNewCardComponent } from './issue-new-card/issue-new-card.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from"@angular/platform-browser/animations";
import { DatePipe } from '@angular/common';
import { AuthInterceptor } from './interceptor';
import { UsersAndRolesComponent } from './users-and-roles/users-and-roles.component';
import { CreatePrintRequestComponent } from './create-print-request/create-print-request.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    NavBarComponent,
    RecieveReportComponent,
    CreatePrintFileComponent,
    LandingComponent,
    IssueNewCardComponent,
    MessageDialogComponent,
    UsersAndRolesComponent,
    CreatePrintRequestComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'log-in', component:LogInComponent},
      {path:'nav-bar', component:NavBarComponent},
      {path:'recieve-report', component:RecieveReportComponent},
      {path:'create-print-file', component:CreatePrintFileComponent},
      {path:'Cards/issue-new-card/:accountNumber', component:IssueNewCardComponent},
      {path:'', component:LogInComponent},
      {path:'landing', component:LandingComponent},
      {path:'create-print-request', component:CreatePrintRequestComponent},
      
      {path:'userRoles', component:UsersAndRolesComponent},
      {
    path: "Cards",
    loadChildren: () =>
      import("./cards-module/cards-module.module").then(m => m.CardsModuleModule)
      }
    ])
  ],
  providers: [HttpClientModule, CardsService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  
  bootstrap: [AppComponent],
  entryComponents: [
   MessageDialogComponent,
  ]
})
export class AppModule { }
