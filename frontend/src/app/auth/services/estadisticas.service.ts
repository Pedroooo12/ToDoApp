import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private apiUrl = "http://localhost:9000/api/estadisticas";


  constructor(private http: HttpClient) { }

  tareasTotales(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasTotales`)
  }

  tareasTodo(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasToDo`);
  }

  tareasDoing(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasDoing`);
  }

  tareasDone(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasDone`);
  }

  tareasFinalizadas(): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/tareasFinalizadas`);
  }
    
}
