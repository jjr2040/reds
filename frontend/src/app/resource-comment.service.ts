import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { ResourceComment } from './models/resource-comment';
import { Observable } from 'rxjs';
import { ErrorHandlingService } from './services/error-handling.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourceCommentService {

  private apiUrl = `${environment.apiUrl}/resource-comments/`;

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getCommentsForResource(resourceId: number): Observable<ResourceComment[]> {
    const url = this.apiUrl + `?resource=${resourceId}`;
    return this.http.get<ResourceComment[]>(url).pipe(
      catchError(this.errorHandlingService.handleError<ResourceComment[]>('Error fetching Comments resource'))
    );
  }

  createComment(comment: ResourceComment): Observable<ResourceComment> {
    return this.http.post<ResourceComment>(this.apiUrl, comment).pipe(
      catchError(this.errorHandlingService.handleError<ResourceComment>('Error creating a resource comment'))
    );
  }

  deleteComment(comment: ResourceComment): Observable<ResourceComment> {
    const url = this.apiUrl + `${comment.id}/`;
    return this.http.delete<ResourceComment>(url).pipe(
      catchError(this.errorHandlingService.handleError<ResourceComment>('Error deleting a resource comment'))
    );
  }
}
