import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Resource } from '../models/resource';
import { AuthenticationService } from './authentication.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Phase } from '../models/phase';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private apiUrl = `${environment.apiUrl}/resources/`;
  private currentResource;
  isCurrentResource: BehaviorSubject<Resource>;

  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService, private authenticationService: AuthenticationService, private router: Router) {
      this.isCurrentResource = new BehaviorSubject(this.currentResource);
      //this.setCurrentResourceFromLocalStorage();
  }

  setCurrentResourceFromLocalStorage() {
    if (this.authenticationService.localStorageAvailable() && localStorage.getItem('currentResource')) {
      this.currentResource = JSON.parse(localStorage.getItem('currentResource'));
      this.isCurrentResource.next(this.currentResource);
    }
  }

  setCurrentResource(resource: Resource) {
    this.currentResource = resource;
    if (resource) {
      localStorage.setItem('currentResource', JSON.stringify(resource));
    } else {
      localStorage.removeItem('currentResource');
    }
    this.isCurrentResource.next(resource);
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

  backToResources() {
    this.currentResource = null;
    if (this.authenticationService.localStorageAvailable()) {
      localStorage.removeItem('currentUser');
    }
    this.isCurrentResource.next(null);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.currentResource) {
      return true;
    }
    this.router.navigate(['/resources']);
    return false;
  }

  getResourcePhases(id: Number): Observable<Phase[]> {
    const url = this.apiUrl + `${id}/phases`;
    return this.http.get<Phase[]>(url).pipe(
      catchError(this.errorHandlingService.handleError<Phase[]>('Error fetching a resource'))
    );
  }

}
