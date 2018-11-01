import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceUsersComponent } from './components/resource-users/resource-users.component';
import { ActivityUsersComponent } from './components/activity-users/activity-users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resources', component: ResourceListComponent},
  { path: 'resource/:id', component: ResourceDetailComponent},
  { path: 'resources/users', component: ResourceUsersComponent},
  { path: 'activity/:id/users', component: ActivityUsersComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
