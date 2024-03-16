import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaCategoriasService {
  private alertasDataSubject = new BehaviorSubject<string>(''); // Puedes usar el tipo de dato que necesites
  public alertasData$ = this.alertasDataSubject.asObservable();

  setAlertasData(data: string) {
    this.alertasDataSubject.next(data);
  }


}
