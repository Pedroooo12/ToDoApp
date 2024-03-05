import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private apiUrl = "http://localhost:9000/api/estadisticas";


  constructor(private http: HttpClient) { }

  tareasTotales(id:Number): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasTotales/${id}`)
  }

  tareasTodo(id:Number): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasToDo/${id}`);
  }

  tareasDoing(id:Number): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasDoing/${id}`);
  }

  tareasDone(id:Number): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasDone/${id}`);
  }

  tareasFinalizadas(id:Number): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasFinalizadas/${id}`);
  }
    
}
