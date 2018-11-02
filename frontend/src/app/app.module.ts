import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { LoadingService } from './services/loading.service';
import { MessageService } from './services/message.service';
import { AppRoutingModule } from './app-routing.module';
import { ErrorHandlingService } from './services/error-handling.service';
import { MatListModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ArtifactListComponent } from './components/artifact-list/artifact-list.component';
import { ResourceUsersComponent } from './components/resource-users/resource-users.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResourceDetailComponent,
    ResourceListComponent,
    ResourceUsersComponent,
    ArtifactListComponent,
    ActivityListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatListModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    LoadingService,
    MessageService,
    ErrorHandlingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
