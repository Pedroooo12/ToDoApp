import { Tarea } from './../interfaces/tarea';
import { Estado } from './../interfaces/estado';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TareaService {
    constructor(private http: HttpClient) { }

    obtenerColorImportancia(importancia: String) {
        switch (importancia) {
          case 'Muy urgente':
            return 'red';
          case 'Urgente':
            return 'orange';
          case 'Medio':
            return '#FFD700';
          case 'Bajo':
            return 'lightgreen';
          case 'Muy bajo':
            return 'lightgrey';
          default:
            return 'black';
        }
      }

    private apiUrl = "http://localhost:9000/api/tareas";
    buscarTodasTareas(): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(this.apiUrl + "/all");
    }

    buscarTareasFiltro(id_categoria: Number, id_importancia: Number, id_user: Number): Observable<Tarea[]>{
        return this.http.get<Tarea[]>(`${this.apiUrl}/filtroTotal?categoria=${id_categoria}&importancia=${id_importancia}&id_user=${id_user}`);
    }

    cambiarEstadoTarea(idTarea: Number, idEstado: Number): Observable<Tarea>{
        return this.http.put<Tarea>(`${this.apiUrl}/cambiarEstado/${idTarea}`, idEstado);
    }

    buscarTareasPorEstado(Estado: Estado): Observable<Tarea[]>{
        return this.http.post<Tarea[]>(`${this.apiUrl}/estado/`, Estado);
    }
    
    
    crearTarea(tarea: Tarea): Observable<Tarea>{
        return this.http.post<Tarea>(this.apiUrl, tarea);
    }
    
    obtenerTareaPorID(id: Number): Observable<Tarea>{
        return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
    }
    
    actualizarTarea(id:Number, tarea: Tarea): Observable<Tarea>{
        return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea);
    }

    terminarTarea(tarea: Tarea): Observable<Tarea>{
        return this.http.put<Tarea>(`${this.apiUrl}/terminarTarea/`, tarea);
    }

    terminarTareas(tareas: Array<Tarea>): Observable<Array<Tarea>>{
        return this.http.put<Array<Tarea>>(`${this.apiUrl}/terminarTareas/`, tareas);
    }
    
    eliminarTarea(id:Number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}