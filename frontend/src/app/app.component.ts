import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from './models/resource';
import { ResourceService } from './services/resource.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSignedIn: boolean;
  resource;

  constructor(private router: Router, private resourceService: ResourceService, private userService: UserService) {
    this.resourceService.isCurrentResource.subscribe((currentResource) => this.resource = currentResource);
    this.userService.isSignedIn.subscribe((isSignedIn) => {
      this.isSignedIn = isSignedIn;
      console.log(isSignedIn);
    });
  }

  goToResources() {
    this.resourceService.backToResources();
    this.router.navigate(['/resources']);
  }

  logOut() {
    this.userService.signOut();
  }
}
