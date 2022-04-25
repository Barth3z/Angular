import { Component, OnInit } from '@angular/core';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms"

//import { INITIAL_EVENTS, createEventId } from './event-utils';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {PriseRdvService} from '../services/prise-rdv.service';
import { RdvService } from '../services/rdv.service';
import {EventsService} from '../services/events.service';
import { Events } from '../models/events';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {PriseRdv} from '../models/prise-rdv';

@Component({
  selector: 'app-calendrier-pro',
  templateUrl: './calendrier-pro.component.html',
  styleUrls: ['./calendrier-pro.component.css']
})
export class CalendrierProComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prenom', 'mail', 'start', 'end', 'motif'];
  rdv: any = [];
  eventForm : FormGroup;
  dataSource: MatTableDataSource<PriseRdv>;

  constructor(private priseRdvService: PriseRdvService, private rdvService: RdvService, private eventsService: EventsService, private _snackBar: MatSnackBar) {
    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    });
    this.dataSource = new MatTableDataSource();
  }

  /**
   * ngOnInit() permet d'afficher qu'importe la situation, ce que le développeur écrit. 
   */
  ngOnInit(): void {

    this.priseRdvService.getNewPriseRdvs().subscribe(rdv => {
      const rdvs = rdv;
      this.dataSource = new MatTableDataSource(rdvs);
    });

    this.getAllEvents();
  }

  /**
   * ce sont des variables qui permettent l'affichage complet du calendrier qu'on a construit.
   */
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    buttonText: {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      list: 'Liste',
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: true,
    eventsSet: this.handleEvents.bind(this),
  };

  currentEvents: EventApi[] = [];

  /**
   * Cette fonction handleCalendarToggle() permet de cacher le calendrier selon si l'utilisateur le souhaite ou non.
   */
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }
  
  /**
   * La fonction handleWeekendsToggle() permet de cacher les week-ends du calendrier.
   */
  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  /**
   * Cette méthode getAllEvents() a la capacité d'afficher tout les évènements que le docteur ecrit, tout cela s'affichera  dans le calendrier. 
   */
  getAllEvents() {
    this.eventsService.getEvents().subscribe((data: any) => {
      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        buttonText: {
          today: 'Aujourd\'hui',
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          list: 'Liste',
        },
        initialView: 'timeGridWeek',
        selectable: false,
        editable: false,
        events: data,
        eventClick: this.supprimerEvent.bind(this),
      }
    });
  }

    /**
   * Cette méthode getRdvs() permet d'afficher tous les rendez-vous pris par les patients, afin d'optimiser son temps.
   */
  getAllRdvs() {
    this.rdvService.getNewRdvs().subscribe((data: any) => {
      this.calendarOptions = {
        initialView: 'timeGridWeek',
        selectable: false,
        editable: false,
        events: data,
      };
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  /**
   * La fonction ajouterEvent() permet de créer un évènement qui sera afficher sur le calendrier.
   */
  ajouterEvent() {
    console.log(this.eventForm.value);
    if(this.eventForm.invalid) {
      alert('Veuillez remplir les champs avant de créer l\'évènement !');
    }
    else {
      this.eventsService.postEvents(this.eventForm.value).subscribe(res => {
        console.log(res);
        if(res==null) {
          alert('Un évènement exite déjà à cette date là !');
        }
        else if(res['status']=='Rendez-vous enregistré') {
          this.openSnackBar('Rendez-vous enregistré !', 'done');
        }
      });
    }
  }

    /**
   * La méthode supprimerEven(data:any) permet de supprimer un rendez-vous ou quoi que ce soit sur le calendrier du docteur.
   * @param data renvoie la réponse générer par la suppression d'un évènement
   */
  supprimerEvent(data:any) {
    let event;
    console.log(data.event.start);
    if(confirm('Supprimer ce rendez-vous ?')) {
      this.eventsService.deleteEvent(data.event.start).subscribe((data:any) => {});
      this.openSnackBar('Rendez-vous supprimé !', 'done');
    }
  }

  /**
   *  Cette fonction openSnackBar(message: string, action: string) permet d'afficher un message en bas de page selon ce que le développeur requiert.
   * @param message Ce paramètre permet à l'utilisateur d'écrire un message qui va par la suite être affiché grâce au paramètre action.
   * @param action  Ce paramètre permet d'afficher le message écrit.
  */

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
