
export class FormularioFase1 {
  id: number;
  correo: string;
  pin: string;
  pregunta1: {
    opcion: string,
    respuesta: string
  };
  preguntas2: [{
    pid: string,
    pos: number
  }];
  created_At: Date;
  updated_At: Date;
}
