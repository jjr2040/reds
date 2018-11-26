import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlingService {

  constructor(private router: Router) { }

  handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.showHandleErrorMessage(operation, error);
      this.performAdditionalErrorActions(error);
      return of(result as T);
    };
  }

  handleHttpResponseError<T>(operation: string) {
    return (error: any): Observable<HttpResponse<T>> => {
      console.error(error);
      this.showHandleErrorMessage(operation, error);
      this.performAdditionalErrorActions(error);
      return of(error as HttpResponse<T>);
    };
  }

  showHandleErrorMessage(operation: string, error: any) {
    const swalOptions: any = {type: 'error', title: `Ocurrió un error al ${operation}`};
    if (error.status === 0) {
      swalOptions.text = 'No se pudo obtener una respuesta del servidor';
    } else if (Math.floor(error.status / 100) === 4) {
      if (error.error instanceof Array) {
        let html = '<span>Ocurrieron los siguientes errores: </span><ul>';
        error.error.forEach((errorMessage) => {
          html += `<li>${errorMessage}</li>`;
        });
        html += '</ul>';
        swalOptions.html = html;
      } else {
        swalOptions.text = error.error.message;
      }
    } else if (Math.floor(error.status / 100) === 5) {
      swalOptions.text = `Ocurrió un error inesperado en el servidor: ${error.error}`;
    }
    swal(swalOptions);
  }

  performAdditionalErrorActions(error: any) {
    if (error.status === 401 || error.status === 403) {
    }
    if (error.status === 404) {
      this.router.navigate(['/resources']);
    }
  }
}
