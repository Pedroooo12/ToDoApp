import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filtrado } from '../interfaces/filtrado';

@Injectable({
  providedIn: 'root'
})
export class FiltradoService {
  private ApiURL = "http://localhost:9000/api/tareas";

  private eventData!: Filtrado;

  constructor(private http: HttpClient) { }

  set eventDataSetter(eventData: Filtrado){
    this.eventData = eventData;
  }

  get eventDataCurrent(){
    return this.eventData;
  }

}
