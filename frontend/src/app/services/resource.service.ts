import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Resource } from '../models/resource';
import { Phase } from '../models/phase';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private apiUrl = `${environment.apiUrl}/resources/`;
  private currentResource: Resource;

  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService) { }

  setCurrentResource(resource: Resource) {
    this.currentResource = resource;
  }

  getCurrentResource(): Resource {
    return this.currentResource;
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.apiUrl).pipe(
      catchError(this.errorHandlingService.handleError<Resource[]>('Error fetching resources'))
    );
  }

  getResource(id: Number): Observable<Resource> {
    const url = this.apiUrl + `${id}/`;
    return this.http.get<Resource>(url).pipe(
      catchError(this.errorHandlingService.handleError<Resource>('Error fetching a resource'))
    );
  }

  createResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(this.apiUrl, resource).pipe(
      catchError(this.errorHandlingService.handleError<Resource>('Error creating a resource'))
    );
  }

  updateResource(resource: Resource): Observable<Resource> {
    const url = this.apiUrl + `${resource.id}/`;
    return this.http.put<Resource>(url, resource).pipe(
      catchError(this.errorHandlingService.handleError<Resource>('Error updating a resource'))
    );
  }

  getResourcePhases(id: Number): Observable<Phase[]> {
    const url = this.apiUrl + `${id}/phases`;
    return this.http.get<Phase[]>(url).pipe(
      catchError(this.errorHandlingService.handleError<Phase[]>('Error fetching a resource'))
    );
  }

}
