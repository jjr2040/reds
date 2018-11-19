import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class MessageService {

  constructor() { }

  showSuccess(title: string, text: string) {
    return swal({
      type: 'success',
      title: title,
      text: text
    });
  }

  showError(title: string, text: string) {
    swal({
      type: 'error',
      title: title,
      text: text
    });
  }

  showConfirmDialog(operation: string, consequence: string): Promise<any> {
    return swal({
      title: `¿Seguro que deseas ${operation}?`,
      text: consequence,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    });
  }
}
