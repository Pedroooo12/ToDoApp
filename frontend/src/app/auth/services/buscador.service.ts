import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  private apiUrl = "http://localhost:9000/api/tareas";
  constructor(private http: HttpClient) { }

  buscadorPorNombre(texto:String, user_id: Number): Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.apiUrl}/buscador?terminoBusqueda=${texto}&id_user=${user_id}`);
  }

}
