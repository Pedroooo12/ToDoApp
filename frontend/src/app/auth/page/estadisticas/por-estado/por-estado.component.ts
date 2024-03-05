import { Component, ElementRef } from '@angular/core';
import { ArcElement, Chart } from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { EstadisticasService } from 'src/app/auth/services/estadisticas.service';

@Component({
  selector: 'app-por-estado',
  templateUrl: './por-estado.component.html',
  styleUrls: ['./por-estado.component.css']
})
export class PorEstadoComponent {
  public chart!: Chart<'pie', Number[], string>;

  public tareasTotales!: number;

  public tareasToDo!: number;
  public tareasDoing!: number;
  public tareasDone!: number;
  public tareasFinalizadas!: number;

  public data = {
    labels: [
      'Todo',
      'Doing',
      'Done',
      'Finalizadas'
    ],
    datasets: [{
      label: '',
      data: [0,0,0,0],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(79, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  constructor(private _estadisticasService: EstadisticasService){
  }

  ngOnInit(): void{
    this.cogerValoresTareas();
  }

  cogerValoresTareas() {
    // Realiza todas las solicitudes de manera concurrente utilizando forkJoin
    forkJoin([
      this._estadisticasService.tareasTotales(),
      this._estadisticasService.tareasTodo(),
      this._estadisticasService.tareasDoing(),
      this._estadisticasService.tareasDone(),
      this._estadisticasService.tareasFinalizadas()
    ]).subscribe(
      ([tareasTotales, tareasToDo, tareasDoing, tareasDone, tareasFinalizadas]) => {
        this.tareasTotales = tareasTotales;
        this.tareasToDo = tareasToDo;
        this.tareasDoing = tareasDoing;
        this.tareasDone = tareasDone;
        this.tareasFinalizadas = tareasFinalizadas;

        this.inicializarChart();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  inicializarChart(id?: number) {

    const btn_porcentaje = document.getElementById("btn_porcentaje");
    const btn_valores = document.getElementById("btn_valores");

    if (this.chart) {
      this.chart.destroy();
    }

    if(id){
      btn_porcentaje?.classList.add("hidden");
      btn_valores?.classList.remove("hidden");
      btn_valores?.classList.add("block");

      this.data = {
        labels: ['Todo', 'Doing', 'Done', 'Finalizadas'],
        datasets: [{
          label: '',
          data: [this.convertirAPorcentaje(this.tareasToDo), this.convertirAPorcentaje(this.tareasDoing), this.convertirAPorcentaje(this.tareasDone),this.convertirAPorcentaje(this.tareasFinalizadas)],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(79, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
    }else{
      btn_porcentaje?.classList.remove("hidden");
      btn_valores?.classList.add("hidden");

      this.data = {
        labels: ['Todo', 'Doing', 'Done', 'Finalizadas'],
        datasets: [{
          label: '',
          data: [this.tareasToDo, this.tareasDoing, this.tareasDone,this.tareasFinalizadas],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(79, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
    }

    this.chart = new Chart("chart", {
      type: 'pie',
      data: this.data,
    });

    
  }

  cambiarAPorcentaje(){

  }

  convertirAPorcentaje(numero: number): number {
    return (this.tareasTotales * numero)  / 100;
  }

  cambiarEstado(acordeon: HTMLDivElement){
    console.log("entra");
    acordeon.classList.toggle("hidden");
  }
}
