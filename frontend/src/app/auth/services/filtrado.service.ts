import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltradoService {
  private ApiURL = "http://localhost:9000/api/tareas";

  private eventData: Object = {id_categoria: Number, id_importancia: Number};

  constructor(private http: HttpClient) { }

  set eventDataSetter(eventData: { id_categoria: Number, id_importancia: Number }){
    this.eventData = eventData;
  }

  get eventDataCurrent(){
    return this.eventData;
  }

}
