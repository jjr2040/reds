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
import { AddArtifactComponent } from './components/add-artifact/add-artifact.component';
import { ActivityUsersComponent } from './components/activity-users/activity-users.component';
import { ResourcesCreateComponent } from './components/resources-create/resources-create.component';
import { ActivityEditComponent } from './components/activity-edit/activity-edit.component';
import { ResourcesEditComponent } from './components/resources-edit/resources-edit.component';
import { ArtifactDetailComponent } from './components/artifact-detail/artifact-detail.component';
import { MeetingRecordComponent } from './components/meeting-record/meeting-record.component';
import { MeetingRecordEditComponent } from './components/meeting-record-edit/meeting-record-edit.component';
import { ResourceCommentsListComponent } from './resource-comments-list/resource-comments-list.component';
import { ResourceCommentsCreateComponent } from './resource-comments-create/resource-comments-create.component';
import { FindArtifactsComponent } from './components/find-artifacts/find-artifacts.component';
import { MyFilterPipe } from './components/find-artifacts/pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResourceDetailComponent,
    ResourceListComponent,
    ResourceUsersComponent,
    ArtifactListComponent,
    ActivityUsersComponent,
    ActivityListComponent,
    AddArtifactComponent,
    ResourcesCreateComponent,
    ResourcesEditComponent,
    ActivityEditComponent,
    ArtifactDetailComponent,
    MeetingRecordComponent,
    MeetingRecordEditComponent,
    ResourceCommentsListComponent,
    ResourceCommentsCreateComponent,
    FindArtifactsComponent,
    MyFilterPipe
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
