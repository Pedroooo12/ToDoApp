import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TareaService } from 'src/app/auth/services/tarea.service';

@Component({
  selector: 'app-por-fecha',
  templateUrl: './por-fecha.component.html',
  styleUrls: ['./por-fecha.component.css']
})
export class PorFechaComponent implements OnInit{
  fechasTareas: (string)[] = [];

  fechasTareasSinRepetir: (string)[] = [];

  fechaMasAntigua!: Date;
  fechaActual!: Date;

  tareasCompletadasPorDia!: number;

public chart!: Chart<'bar', Number[], string>;

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
    borderColor: 'rgb(75, 192, 192)',
    fill: true,
    tension: 1,
    hoverOffset: 4
  }]
};

tareasFinalizadas: Tarea[] = [];

id_user!: Number;

  constructor(private _tareaService: TareaService, private _authService: AuthService) {
    if (this._authService.currentUser) {
      this.id_user = this._authService.currentUser.id!;
    }
  }

  ngOnInit(): void {
    this.inicializarChart();
  }

  inicializarChart() {
    this._tareaService.buscarTareasPorEstado(this.id_user,4).subscribe(fechasResp => {
      console.log(fechasResp);
      for (let index = 0; index < fechasResp.length; index++) {
        let fecha = new Date (fechasResp[index].created!); 
        console.log(fecha);
        this.fechasTareas.push(fecha.getDate().toString() + "/" + fecha.getMonth().toString() + "/" + fecha.getFullYear().toString());
        
      }
      console.log(this.fechasTareas);
      console.log(this.contarFrecuenciaPorPropiedad(this.fechasTareas));

      this.data = {
        labels: this.obtenerNoRepetidos(this.fechasTareas),
        datasets: [{
          label: 'Tareas Completadas',
          data: this.contarFrecuenciaPorPropiedad(this.fechasTareas),
          backgroundColor: this.generarColoresParaFondo(this.fechasTareas.length),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          hoverOffset: 4
        }]
      };

      this.chart = new Chart("chartFecha", {
        type: 'bar',
        data: this.data,
      });
    });

  
        
  }

  obtenerNoRepetidos(elementos: string[]) {
    const conjuntoElementosUnicos = new Set(elementos);
    const arrayNoRepetidos = [...conjuntoElementosUnicos];
    return arrayNoRepetidos;
  }
  
  
  contarFrecuenciaPorPropiedad(elementos: any[]): number[] {
    var countObject: any = {};
    
    for (let index = 0; index < elementos.length; index++) {
        let currentElement = elementos[index];
        if (countObject[currentElement] === undefined) {
            countObject[currentElement] = 1;
        } else {
            countObject[currentElement]++;
        }
    }

    var nuevoArray: number[] = Object.values(countObject);
    return nuevoArray;

  }
  


  generarColoresParaFondo(numero: number): string[]{
    const colores: string[] = [];
    for (let i = 0; i < numero; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
      colores.push(color);
    }
    return colores;
  }
}
