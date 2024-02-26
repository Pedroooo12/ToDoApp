import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Importancia } from '../interfaces/importancia';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
    constructor(private http: HttpClient) { }

    private apiUrl = "localhost:9000/api/importancia";
    
    buscarImportancia(): Observable<Importancia[]> {
        return this.http.get<Importancia[]>(this.apiUrl);
      }
    
    
    crearImportancia(Importancia: Importancia): Observable<Importancia>{
        return this.http.post<Importancia>(this.apiUrl, Importancia);
    }
    
    obtenerImportanciaPorID(id: number): Observable<Importancia>{
        return this.http.get<Importancia>(`${this.apiUrl}/${id}`);
    }
    
    actualizarImportancia(id:number, Importancia: Importancia): Observable<Importancia>{
        return this.http.put<Importancia>(`${this.apiUrl}/${id}`, Importancia);
    }
    
    eliminarImportancia(id:number): Observable<Importancia>{
        return this.http.delete<Importancia>(`${this.apiUrl}/${id}`);
    }
}