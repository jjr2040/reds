import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
