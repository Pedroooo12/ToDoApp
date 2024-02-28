import { Estado } from './../interfaces/estado';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea';

@Injectable({providedIn: 'root'})
export class TareaService {
    constructor(private http: HttpClient) { }

    private apiUrl = "http://localhost:9000/api/tareas";
    
    buscarTodasTareas(): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(this.apiUrl + "/all");
    }

    buscarTareasPorEstado(Estado: Estado): Observable<Tarea[]>{
        return this.http.post<Tarea[]>(`${this.apiUrl}/estado/`, Estado);
    }
    
    
    crearTarea(Tarea: Tarea): Observable<Tarea>{
        return this.http.post<Tarea>(this.apiUrl, Tarea);
    }
    
    obtenerTareaPorID(id: number): Observable<Tarea>{
        return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
    }
    
    actualizarTarea(id:number, Tarea: Tarea): Observable<Tarea>{
        return this.http.put<Tarea>(`${this.apiUrl}/${id}`, Tarea);
    }
    
    eliminarTarea(id:number): Observable<Tarea>{
        return this.http.delete<Tarea>(`${this.apiUrl}/${id}`);
    }
}