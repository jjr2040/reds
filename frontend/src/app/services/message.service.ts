import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class MessageService {

  constructor() { }

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
