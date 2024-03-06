import { User } from "src/app/interfaces/user";
import { Categoria } from "./categoria";
import { Importancia } from "./importancia";
import { Estado } from "./estado";

export interface Tarea {
    id?: Number,
    nombre: String,
    descripcion: String,
    created?: Date,
    updated?: Date,
    categoria: Categoria,
    importancia: Importancia,
    estado: Estado,
    user: User
}
