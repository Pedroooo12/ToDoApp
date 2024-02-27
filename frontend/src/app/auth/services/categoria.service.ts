import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({providedIn: 'root'})
export class CategoriaService {
    constructor(private http: HttpClient) { }

    private apiUrl = "http://localhost:9000/api/categoria";
    
    buscarCategoriasPorUser(id: Number): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.apiUrl}/user/${id}`);
      }
    
    
    crearCategoria(Categoria: Categoria): Observable<Categoria>{
        return this.http.post<Categoria>(this.apiUrl, Categoria);
    }
    
    obtenerCategoriaPorID(id: Number): Observable<Categoria>{
        return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
    }
    
    actualizarCategoria(id:Number, Categoria: Categoria): Observable<Categoria>{
        return this.http.put<Categoria>(`${this.apiUrl}/${id}`, Categoria);
    }
    
    eliminarCategoria(id:Number): Observable<Categoria>{
        return this.http.delete<Categoria>(`${this.apiUrl}/${id}`);
    }
}