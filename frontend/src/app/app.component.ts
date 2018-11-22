import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Resource } from './models/resource';
import { ResourceService } from './services/resource.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logueado: boolean;
  resource;

  constructor(private authenticationService: AuthenticationService, private router: Router, private resourceService: ResourceService) {
    this.authenticationService.isSignedIn.subscribe((isSignedIn) => this.logueado = isSignedIn);
    this.resourceService.isCurrentResource.subscribe((currentResource) => this.resource = currentResource);
  }

  goToResources() {
    this.resourceService.backToResources();
    this.router.navigate(['/resources']);
  }
}
