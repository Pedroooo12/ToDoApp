import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EstadisticasService } from 'src/app/auth/services/estadisticas.service';

@Component({
  selector: 'app-por-finalizadas',
  templateUrl: './por-finalizadas.component.html',
  styleUrls: ['./por-finalizadas.component.css']
})
export class PorFinalizadasComponent {

  TareasMapa = {
    '=0': 'no tienes ninguna tarea',
    '=1': 'tienes una tarea',
    '=2': 'tienes dos tareas',
    //cualquier otro valor
    'other': 'tienes # tareas'
  }

  private id_user!: Number;

  public chart!: Chart<'polarArea', Number[], string>;

  public tareasTotales!: number;
  public tareasFinalizadas!: number;

  public data = {
    labels: [
      'Todo',
      'Doing',
      'Done',
    ],
    datasets: [{
      label: '',
      data: [0,0,0],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4
    }]
  };

  constructor(private _estadisticasService: EstadisticasService, private _authService: AuthService){
    if(this._authService.currentUser){
      this.id_user = this._authService.currentUser.id!;
    }
  }

  ngOnInit(): void{
    this.cogerValoresTareas();
  }

  cogerValoresTareas() {
    // Realiza todas las solicitudes de manera concurrente utilizando forkJoin
    forkJoin([
      this._estadisticasService.tareasTotales(this.id_user),
      this._estadisticasService.tareasFinalizadas(this.id_user)
    ]).subscribe(
      ([tareasTotales, tareasFinalizadas]) => {
        this.tareasTotales = tareasTotales;
        this.tareasFinalizadas = tareasFinalizadas;

        this.inicializarChart();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  inicializarChart(id?: number) {

    const btn_porcentaje = document.getElementById("btn_porcentaje_finalizadas");
    const btn_valores = document.getElementById("btn_valores_finalizadas");
    console.log("entra");
    if (this.chart) {
      this.chart.destroy();
    }

    if(id){
      console.log("entra id");
      btn_porcentaje?.classList.add("hidden");
      btn_valores?.classList.remove("hidden");
      btn_valores?.classList.add("block");

      this.data = {
        labels: ['Totales', 'Finalizadas'],
        datasets: [{
          label: '',
          data: [this.convertirAPorcentaje(this.tareasTotales), this.convertirAPorcentaje(this.tareasFinalizadas)],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      };
      
      this.chart = new Chart("chartFinalizadas", {
        type: 'polarArea', // Cambia 'pie' a 'polarArea'
        data: this.data,
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  var label = context.label || '';
                  var percentage = context.dataset.data[context.dataIndex];
                  return `${label}: ${percentage}%`;
                }
              }
            }
          },
        }
      });
      
    }else{
      console.log("entra no id");
      btn_porcentaje?.classList.remove("hidden");
      btn_valores?.classList.add("hidden");

      this.data = {
        labels: ['Totales', 'Finalizadas'],
        datasets: [{
          label: '',
          data: [this.tareasTotales, this.tareasFinalizadas],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      };

      this.chart = new Chart("chartFinalizadas", {
        type: 'polarArea',
        data: this.data,
      });
    }

    

    
  }

  convertirAPorcentaje(numero: number): number {
    return Number(((100 * numero)  / this.tareasTotales).toFixed(2));
  }

  cambiarEstado(acordeon: HTMLDivElement){
    console.log("entra");
    acordeon.classList.toggle("hidden");
  }
}
