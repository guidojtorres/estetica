export interface IAuthProvider {
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ITratamiento {
  _id: string;
  categorias: string[];
  descripcion: string;
  esDestacado: boolean;
  pathFotos: string[];
  subtitulo: string;
  titulo: string;
  dondeEmplear: string;
  verMas: string;
  _v: number;
}

export interface ICategoria {
  esDestacada: boolean;
  nombre: string;
  pathIcono: string;
  __v: number;
  _id: string;
}

export interface IContacto {
  nombre: string;
  apellido: string;
  email: string;
  asunto: string;
  mensaje: string;
  fecha: Date;
  _id: string;
  __v: number;
}

export interface ITurno {
  _id: string;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  asunto: string;
  modalidad: string;
  metodoDePago: number;
  fuePagado: boolean;
  fecha: string;
  mensaje?: string;
  start?: Date;
  end?: Date;
}
