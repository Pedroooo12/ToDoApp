import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { EstadisticasService } from 'src/app/auth/services/estadisticas.service';

@Component({
  selector: 'app-listado-estadisticas',
  templateUrl: './listado-estadisticas.component.html',
  styleUrls: ['./listado-estadisticas.component.css']
})
export class ListadoEstadisticasComponent{
  constructor(){
    
  }
}
