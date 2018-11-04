import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceVersion } from '../models/ResourceVersion';

@Injectable({
  providedIn: 'root'
})
export class ResourceVersionService {

  private apiUrl = `${environment.apiUrl}/resource-versions/`;

  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService) { }

  getResourceVersions(): Observable<ResourceVersion[]> {
    return this.http.get<ResourceVersion[]>(this.apiUrl).pipe(
      catchError(this.errorHandlingService.handleError<ResourceVersion[]>('Error fetching ResourceVersions'))
    );
  }

  getResourceVersionVersion(id: Number): Observable<ResourceVersion> {
    const url = this.apiUrl + `${id}/`;
    return this.http.get<ResourceVersion>(url).pipe(
      catchError(this.errorHandlingService.handleError<ResourceVersion>('Error fetching a ResourceVersion'))
    );
  }

  createResourceVersion(resourceVersion: ResourceVersion): Observable<ResourceVersion> {
    return this.http.post<ResourceVersion>(this.apiUrl, resourceVersion).pipe(
      catchError(this.errorHandlingService.handleError<ResourceVersion>('Error creating a ResourceVersion'))
    );
  }
}
