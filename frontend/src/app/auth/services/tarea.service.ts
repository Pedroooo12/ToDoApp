import { Tarea } from './../interfaces/tarea';
import { Estado } from './../interfaces/estado';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TareaService {
    constructor(private http: HttpClient) { }

    private apiUrl = "http://localhost:9000/api/tareas";
    
    buscarTodasTareas(): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(this.apiUrl + "/all");
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
    
    eliminarTarea(id:Number): Observable<Tarea>{
        return this.http.delete<Tarea>(`${this.apiUrl}/${id}`);
    }
}