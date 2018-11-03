import { ActivityEditComponent } from './components/activity-edit/activity-edit.component';
import { ResourcesEditComponent } from './components/resources-edit/resources-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceUsersComponent } from './components/resource-users/resource-users.component';
import { ActivityUsersComponent } from './components/activity-users/activity-users.component';
import { AddArtifactComponent } from './components/add-artifact/add-artifact.component';
import { ResourcesCreateComponent } from './components/resources-create/resources-create.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { MeetingRecordComponent } from './components/meeting-record/meeting-record.component';
import { MeetingRecordEditComponent } from './components/meeting-record-edit/meeting-record-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resources', component: ResourceListComponent},
  { path: 'resources/new', component: ResourcesCreateComponent},
  { path: 'resources/edit/:id', component: ResourcesEditComponent},
  { path: 'resources/users', component: ResourceUsersComponent},
  { path: 'resources/:id', component: ResourceDetailComponent},
  { path: 'activity/:id/users', component: ActivityUsersComponent},
  { path: 'activity/new', component: ActivityEditComponent},
  { path: 'activity/:id/edit', component: ActivityEditComponent},
  { path: 'activities', component: ActivityListComponent},
  { path: 'users', component: ResourceUsersComponent},
  { path: 'resource/:id/artifacts/create/:name', component: AddArtifactComponent},
  { path: 'meetingRecords', component: MeetingRecordComponent},
  { path: 'meetingRecords/new', component: MeetingRecordEditComponent},
  { path: 'resource/:id/meetingRecord', component: MeetingRecordComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
