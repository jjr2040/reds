import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService implements CanActivate {
  isSignedIn: BehaviorSubject<boolean>;
  currentUser: any;
  currentToken: any;

  constructor(private http: HttpClient, private router: Router,
              private loadingService: LoadingService, private messageService: MessageService) {
    this.setCurrentTokenFromLocalStorage();
    this.isSignedIn = new BehaviorSubject(this.currentToken);
  }

  localStorageAvailable() {
    return typeof(Storage) !== 'undefined';
  }

  setCurrentTokenFromLocalStorage() {
    if (this.localStorageAvailable() && localStorage.getItem('currentToken')) {
      this.currentToken = JSON.parse(localStorage.getItem('currentToken'));
    }
    return this.currentToken;
  }

  setCurrentUserFromLocalStorage() {
    if (this.localStorageAvailable() && localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    return this.currentUser;
  }

  getApiHttpHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.currentToken
      });
  }

  getApiRequestHeaders() {
    if (this.currentUser) {
      return { headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-User-Email': this.currentUser.email,
        'X-User-Token': this.currentUser.authenticationToken
      }) };
    } else {
      return { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    }
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.roles.some((role) => {
      return role.role === 'admin';
    });
  }

  signIn(loginObjects) {
    this.http.post(`${environment.apiUrl}/login/`, loginObjects, httpOptions).subscribe((response) => {
      this.isSignedIn.next(true);
      this.loadingService.stopLoading();
      this.router.navigate(['/home']);
      this.currentToken = response['token'];
      localStorage.setItem('currentToken', this.currentToken);
    }, (error: any) => {
      this.messageService.showError('Lo sentimos', error.error.message);
      this.loadingService.stopLoading();
    });
  }

  signOut() {
    this.currentUser = null;
    if (this.localStorageAvailable()) {
      localStorage.removeItem('currentUser');
    }
    this.isSignedIn.next(false);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.currentUser) {
      if (this.isAdmin()) {
        return true;
      } else {
        this.messageService.showError('Lo sentimos', 'No tienes permisos para acceder a esta página.');
      }
    }
    this.router.navigate(['login']);
    return false;
  }
}
