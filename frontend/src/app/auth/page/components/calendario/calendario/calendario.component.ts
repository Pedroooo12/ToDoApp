import { Component, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import multiMonthPlugin from '@fullcalendar/multimonth'
import esLocale from '@fullcalendar/core/locales/es';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { TareaService } from 'src/app/auth/services/tarea.service';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {
  tareas: Tarea[] = [];
  public events: any[] = [];

  private id_user!: Number;

  @ViewChild(CalendarioComponent) calendar! : CalendarioComponent;

  options: any = {};
  constructor(private _tareaService:TareaService, private _authService: AuthService){
    if(this._authService.currentUser){
      this.id_user = this._authService.currentUser.id!;
    }
  }
  ngOnInit() {
    this.iniciarCalendario();
    
  }


  iniciarCalendario(){
    this._tareaService.buscarTareasFiltro(0,0,this.id_user).subscribe(resp => {
      console.log(resp);

      for (let index = 0; index < resp.length; index++) {
        let event =  {
          title: resp[index].nombre,
          date: new Date(resp[index].created!),
          description: "Descripcion",
          color: resp[index].categoria.color,
        };
        this.events.push(event);
      }

      console.log(this.events);
      
      
      
      
    });

    this.options = {
      plugins: [dayGridPlugin, interactionPlugin, multiMonthPlugin, listPlugin, timeGridPlugin],
      //initialView: 'multiMonthYear',
      initialView: 'listWeek',
      defaultDate: this.obtenerFechaMasAntigua(this.events),
      locale: esLocale,
      headerToolbar: {
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: 'today list month year  prev,next' // will normally be on the right. if RTL, will be on the left
      },
      viewHint: function(buttonText: any, buttonName: any) {
        switch(true) {
          case buttonName.match(/^list/):
            return buttonText + " list view";
          case buttonName.match(/^Ano/):
            return buttonText + " multiMonthYear";
          default:
            return buttonText + " view";
        }
      },
      weekends: true,
      backgroundColor: 'white',
      editable: false
    };
  }
  obtenerFechaMasAntigua(fechas: Date[]): Date | null {
      if (fechas.length === 0) {
          return null;
      }

      let fechaMasAntigua = fechas[0]; // Inicializa la fecha más antigua como la primera fecha del array

      for (let i = 1; i < fechas.length; i++) {
          if (fechas[i] < fechaMasAntigua) {
              fechaMasAntigua = fechas[i]; // Actualiza la fecha más antigua si se encuentra una fecha anterior en el array
          }
      }

      return fechaMasAntigua;
  }

}

