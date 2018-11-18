import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Phase } from '../models/phase';


@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  private apiUrl = `${environment.apiUrl}/phases/`;

  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService) { }

  updatePhase(phase: any): Observable<Phase> {
    const url = this.apiUrl + `${phase.id}/`;
    return this.http.put<Phase>(url, phase).pipe(
      catchError(this.errorHandlingService.handleError<Phase>('Error updating a resource'))
    );
  }

}
