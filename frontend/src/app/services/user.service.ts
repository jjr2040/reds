import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/users/`;

  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService) { }

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
    return this.http.post<User>(this.apiUrl + 'loguear', user).pipe(
      catchError(this.errorHandlingService.handleError<User>('Error login user'))
    );
  }
}
