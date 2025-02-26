export interface Usuario {
    nome: string;
    matricula: string ;
    dataNascimento: Date | null;
    tipoSanguineo: string;
    funcao: string;
  }
  
  export interface Cracha {
    empresa: string;
    usuario: Usuario;
    foto: string | null;
  }