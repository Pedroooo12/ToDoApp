import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EstadisticasService } from 'src/app/auth/services/estadisticas.service';

@Component({
  selector: 'app-por-estado',
  templateUrl: './por-estado.component.html',
  styleUrls: ['./por-estado.component.css']
})
export class PorEstadoComponent {

  TareasMapaDone = {
    '=0': 'no tienes ninguna tarea hecha.',
    '=1': 'tienes una tarea hecha pero no finalizada.',
    '=2': 'tienes dos tareas hechas pero no finalizadas.',
    //cualquier otro valor
    'other': 'tienes # tareas hechas pero no finalizadas.'
  }

  TareasMapaDoing = {
    '=0': 'no tienes ninguna tarea hecha.',
    '=1': 'una tarea.',
    '=2': 'dos tareas.',
    //cualquier otro valor
    'other': '# tareas.'
  }

  private id_user!: Number;

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
      this._estadisticasService.tareasTodo(this.id_user),
      this._estadisticasService.tareasDoing(this.id_user),
      this._estadisticasService.tareasDone(this.id_user),
    ]).subscribe(
      ([tareasTotales, tareasToDo, tareasDoing, tareasDone]) => {
        this.tareasTotales = tareasTotales;
        this.tareasToDo = tareasToDo;
        this.tareasDoing = tareasDoing;
        this.tareasDone = tareasDone;

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
        labels: ['Todo', 'Doing', 'Done', ],
        datasets: [{
          label: '',
          data: [this.convertirAPorcentaje(this.tareasToDo), this.convertirAPorcentaje(this.tareasDoing), this.convertirAPorcentaje(this.tareasDone)],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4
        }]
      };

      this.chart = new Chart("chart", {
        type: 'pie',
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
          // Otras opciones de configuración del gráfico
      },
      });
    }else{
      btn_porcentaje?.classList.remove("hidden");
      btn_valores?.classList.add("hidden");

      this.data = {
        labels: ['Todo', 'Doing', 'Done'],
        datasets: [{
          label: '',
          data: [this.tareasToDo, this.tareasDoing, this.tareasDone],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4
        }]
      };

      this.chart = new Chart("chart", {
        type: 'pie',
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
