import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { LoadingService } from './services/loading.service';
import { MessageService } from './services/message.service';
import { AppRoutingModule } from './app-routing.module';
import { ErrorHandlingService } from './services/error-handling.service';
import { HttpExampleService } from './services/http-example.service';
import { MatListModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule
  ],
  providers: [
    AuthenticationService,
    LoadingService,
    MessageService,
    ErrorHandlingService,
    HttpExampleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
