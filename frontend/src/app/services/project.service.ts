import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = `${environment.apiUrl}/projects/`;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
    ) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      catchError(this.errorHandlingService.handleError<Project[]>('Error fetching projects'))
    );
  }
}
