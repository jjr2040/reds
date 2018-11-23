import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/users/`;
  private apiUrlLogin = `${environment.apiUrlLogin}users/loguear/`;
  currentUser;
  isSignedIn: BehaviorSubject<boolean>;

  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService, private router: Router) {
      this.isSignedIn = new BehaviorSubject(this.currentUser);
      this.setCurrentUserFromLocalStorage();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.errorHandlingService.handleError<User[]>('Error fetching users'))
    );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.apiUrl + id).pipe(
      catchError(this.errorHandlingService.handleError<User>('Error fetching users'))
    );
  }

   loguear(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlLogin, user).pipe(
      catchError(this.errorHandlingService.handleError<User>('Error login user'))
    );
  }

  localStorageAvailable() {
    return typeof(Storage) !== 'undefined';
  }

  setCurrentUserFromLocalStorage() {
    if (this.localStorageAvailable() && localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    return this.currentUser;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.currentUser) {
      return true;
    }
    this.router.navigate(['/resources']);
    return false;
  }

  signOut() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.isSignedIn.next(false);
    this.router.navigate(['/']);
  }
}
