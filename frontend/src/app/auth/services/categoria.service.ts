import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
    constructor(private http: HttpClient) { }

    private apiUrl = "http:9000/api/categoria";
    
    buscarCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.apiUrl);
      }
    
    
    crearCategoria(Categoria: Categoria): Observable<Categoria>{
        return this.http.post<Categoria>(this.apiUrl, Categoria);
    }
    
    obtenerCategoriaPorID(id: number): Observable<Categoria>{
        return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
    }
    
    actualizarCategoria(id:number, Categoria: Categoria): Observable<Categoria>{
        return this.http.put<Categoria>(`${this.apiUrl}/${id}`, Categoria);
    }
    
    eliminarCategoria(id:number): Observable<Categoria>{
        return this.http.delete<Categoria>(`${this.apiUrl}/${id}`);
    }
}