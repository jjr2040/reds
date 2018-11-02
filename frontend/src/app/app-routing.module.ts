import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceUsersComponent } from './components/resource-users/resource-users.component';
import { ActivityUsersComponent } from './components/activity-users/activity-users.component';
import { ResourcesCreateComponent } from './components/resources-create/resources-create.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resources', component: ResourceListComponent},
  { path: 'resources/new', component: ResourcesCreateComponent},
  { path: 'resources/:id', component: ResourceDetailComponent},
  { path: 'resources/users', component: ResourceUsersComponent},
 { path: 'activity/:id/users', component: ActivityUsersComponent},
 { path: 'activities', component: ActivityListComponent},
 { path: 'users', component: ResourceUsersComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
