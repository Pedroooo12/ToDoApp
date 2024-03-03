import { Estado } from './estado';
import { User } from "src/app/interfaces/user";

export interface Categoria {
    id?: Number,
    categoria: String,
    color: String,
    user: User
}
