import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logueado: boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.isSignedIn.subscribe((isSignedIn) => this.logueado = isSignedIn);
  }

  goTo(url) {
    this.router.navigate([url]);
  }
}
