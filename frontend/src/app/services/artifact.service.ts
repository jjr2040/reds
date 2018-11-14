import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs';
import { Artifact } from '../models/artifact';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private apiUrl = `${environment.apiUrl}/artifacts/`;
  private aws_credential;

  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService) { }

  getArtifacts(): Observable<Artifact[]> {
    return this.http.get<Artifact[]>(this.apiUrl).pipe(
      catchError(this.errorHandlingService.handleError<Artifact[]>('Error getting artifacts'))
    );
  }

  getArtifact(id: Number): Observable<Artifact> {
    const url = this.apiUrl + `${id}/`;
    return this.http.get<Artifact>(url).pipe(
      catchError(this.errorHandlingService.handleError<Artifact>('Error fetching an artifact'))
    );
  }

  createArtifact(artifact: Artifact): Observable<Artifact> {
    return this.http.post<Artifact>(this.apiUrl, artifact).pipe(
      catchError(this.errorHandlingService.handleError<Artifact>('Error adding an artifact'))
    );
  }

  asignArtifact(artifact_id, resource_id): Observable<Artifact> {
    return this.http.post<Artifact>(`http://localhost:8000/asignarArtefacto/`, {
      artifact_id: artifact_id,
      resource_id: resource_id
    }).pipe(
      catchError(this.errorHandlingService.handleError<Artifact>('Error adding an artifact'))
    );
  }

  updateArtifact(artifact: Artifact): Observable<Artifact> {
    const url = this.apiUrl + `${artifact.id}/`;
    return this.http.put<Artifact>(url, artifact).pipe(
      catchError(this.errorHandlingService.handleError<Artifact>('Error updating an artifact'))
    );
  }

  setCredential(aws_credential) {
    this.aws_credential = aws_credential;
  }

  getAWSCredential() {
    return this.aws_credential;
  }
}
