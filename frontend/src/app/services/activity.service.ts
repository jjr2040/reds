import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkplanActivity } from '../models/WorkplanActivity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = `${environment.apiUrl}/workplan_activities/`;

  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService) { }

  getActivities(): Observable<WorkplanActivity[]> {
    return this.http.get<WorkplanActivity[]>(this.apiUrl).pipe(
      catchError(this.errorHandlingService.handleError<WorkplanActivity[]>('Error fetching activities'))
    );
  }

  getResource(id: Number): Observable<WorkplanActivity> {
    const url = this.apiUrl + `${id}/`;
    return this.http.get<WorkplanActivity>(url).pipe(
      catchError(this.errorHandlingService.handleError<WorkplanActivity>('Error fetching an activity'))
    );
  }

  createResource(activity: WorkplanActivity): Observable<WorkplanActivity> {
    return this.http.post<WorkplanActivity>(this.apiUrl, activity).pipe(
      catchError(this.errorHandlingService.handleError<WorkplanActivity>('Error fetching an activity'))
    );
  }

  updateResource(activity: WorkplanActivity): Observable<WorkplanActivity> {
    const url = this.apiUrl + `${activity.id}/`;
    return this.http.put<WorkplanActivity>(url, activity).pipe(
      catchError(this.errorHandlingService.handleError<WorkplanActivity>('Error fetching an activity'))
    );
  }

}