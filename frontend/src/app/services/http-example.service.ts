import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AuthenticationService } from './authentication.service';
import { ErrorHandlingService } from './error-handling.service';
import { FormularioFase1 } from '../models/formularioFase1';

@Injectable()
export class HttpExampleService {
  private apiURL = `${environment.apiUrl}/`;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService,
              private errorHandlingService: ErrorHandlingService) { }

  postCargarEnvio(formulario): Observable<FormularioFase1> {
    return this.http.post<FormularioFase1>(`${this.apiURL}/cargarEnvio`, formulario)
    .pipe(
      catchError(this.errorHandlingService.handleError<FormularioFase1>('Enviar el formulario'))
    );
  }

  postObtenerEnvio(formulario): Observable<FormularioFase1> {
    return this.http.post<FormularioFase1>(`${this.apiURL}/obtenerEnvio`, formulario)
    .pipe(
      catchError(this.errorHandlingService.handleError<FormularioFase1>('Obtener el formulario'))
    );
  }
}
