import { Estado } from './../interfaces/estado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root'
})
export class FiltradoService {
  private ApiURL = "http://localhost:9000/api/tareas";
  constructor(private http: HttpClient) { }

  filtrarPorCategoria(id: Number, estado: Estado): Observable<Array<Tarea>>{
    return this.http.post<Array<Tarea>>(`${this.ApiURL}/categoria/filtrado`,
      {
        "categoriaId": id,
        "estado": estado
      }
    );
  }

  filtrarPorImportancia(id:Number){
    return this.http.get<Array<Tarea>>(`${this.ApiURL}/importancia/${id}`);
  }



}
