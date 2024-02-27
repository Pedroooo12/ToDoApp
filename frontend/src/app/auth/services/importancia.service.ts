import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Importancia } from '../interfaces/importancia';

@Injectable({providedIn: 'root'})
export class ImportanciaService {
    constructor(private http: HttpClient) { }

    private apiUrl = "http://localhost:9000/api/importancia";
    
    buscarImportanciasPorUser(id:Number): Observable<Importancia[]> {
        return this.http.get<Importancia[]>(`${this.apiUrl}/user/${id}`);
      }
    
    
    crearImportancia(Importancia: Importancia): Observable<Importancia>{
        return this.http.post<Importancia>(this.apiUrl, Importancia);
    }
    
    obtenerImportanciaPorID(id: Number): Observable<Importancia>{
        return this.http.get<Importancia>(`${this.apiUrl}/${id}`);
    }
    
    actualizarImportancia(id:Number, Importancia: Importancia): Observable<Importancia>{
        return this.http.put<Importancia>(`${this.apiUrl}/${id}`, Importancia);
    }
    
    eliminarImportancia(id:Number): Observable<Importancia>{
        return this.http.delete<Importancia>(`${this.apiUrl}/${id}`);
    }
}