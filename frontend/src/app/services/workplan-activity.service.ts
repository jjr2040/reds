import { catchError } from 'rxjs/operators';
import { WorkplanActivity } from './../models/workplan-activity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class WorkplanActivityService {

  private apiUrl = `${environment.apiUrl}/workplan-activities/`;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getWorkplanActivities(): Observable<WorkplanActivity[]> {
    return this.http.get<WorkplanActivity[]>(this.apiUrl).pipe(
      catchError(this.errorHandlingService.handleError<WorkplanActivity[]>('Error fetching workplan activities'))
    );
  }
}
