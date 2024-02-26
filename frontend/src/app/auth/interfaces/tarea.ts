import { Categoria } from "./categoria";
import { Importancia } from "./importancia";

export interface Tarea {
    id?: Number,
    nombre: String,
    descripcion: String,
    terminada: boolean,
    categoria: Categoria,
    importancia: Importancia
}
