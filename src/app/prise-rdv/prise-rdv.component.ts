import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PriseRdvService } from '../services/prise-rdv.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms"

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { DateSelectArg, EventClickArg, EventApi, EventRemoveArg, EventChangeArg} from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import { ElementRef, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/angular';
import { RdvService } from '../services/rdv.service';

@Component({
  selector: 'app-prise-rdv',
  templateUrl: './prise-rdv.component.html',
  styleUrls: ['./prise-rdv.component.css'],
  providers: [PriseRdvService]
})

export class PriseRdvComponent implements OnInit {

  priseForm : FormGroup;

  eventGuid = 0;
  zero = '00:00';
  trente = '30:00';
  neuf = 9;
  dix = 10;
  onze=11;
  douze=12;
  treize=13;
  quatorze=14;
  quinze=15;
  seize=16;
  dixSept=17;

  today_str = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
  
  events = [
    //1er jour
    {
      id: this.createEventId(),
      start: this.today_str + 'T0' + this.neuf + ':' + this.zero,
      end: this.today_str + 'T0' + this.neuf + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T0' + this.neuf + ':' + this.trente,
      end: this.today_str + 'T' + this.dix + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.dix + ':' + this.zero,
      end: this.today_str + 'T' + this.dix + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.dix + ':' + this.trente,
      end: this.today_str + 'T' + this.onze + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.onze + ':' + this.zero,
      end: this.today_str + 'T' + this.onze + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.onze + ':' + this.trente,
      end: this.today_str + 'T' + this.douze + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.treize + ':' + this.zero,
      end: this.today_str + 'T' + this.treize + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.treize + ':' + this.trente,
      end: this.today_str + 'T' + this.quatorze + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.quatorze + ':' + this.zero,
      end: this.today_str + 'T' + this.quatorze + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.quatorze + ':' + this.trente,
      end: this.today_str + 'T' + this.quinze + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.quinze + ':' + this.zero,
      end: this.today_str + 'T' + this.quinze + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.quinze+ ':' + this.trente,
      end: this.today_str + 'T' + this.seize + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.seize + ':' + this.zero,
      end: this.today_str + 'T' + this.seize + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + this.seize + ':' + this.trente,
      end: this.today_str + 'T' + this.dixSept + ':' + this.zero,
    },
    //2ème jour
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.neuf + 24) + ':' + this.zero,
      end: this.today_str + 'T' + (this.neuf + 24) + ':' + this.trente,
      eventResourceEditable:true,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.neuf + 24) + ':' + this.trente,
      end: this.today_str + 'T' + (this.dix + 24) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.dix + 24) + ':' + this.zero,
      end: this.today_str + 'T' + (this.dix + 24) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.dix + 24) + ':' + this.trente,
      end: this.today_str + 'T' + (this.onze + 24) +':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.onze + 24) + ':' + this.zero,
      end: this.today_str + 'T' + (this.onze + 24) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.onze + 24) + ':' + this.trente,
      end: this.today_str + 'T' + (this.douze + 24) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.treize + 24) + ':' + this.zero,
      end: this.today_str + 'T' + (this.treize + 24) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.treize + 24) + ':' + this.trente,
      end: this.today_str + 'T' + (this.quatorze + 24) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quatorze + 24) + ':' + this.zero,
      end: this.today_str + 'T' + (this.quatorze + 24) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quatorze + 24) + ':' + this.trente,
      end: this.today_str + 'T' + (this.quinze + 24) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quinze + 24) + ':' + this.zero,
      end: this.today_str + 'T' + (this.quinze + 24) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quinze+ 24) + ':' + this.trente,
      end: this.today_str + 'T' + (this.seize + 24) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.seize + 24) + ':' + this.zero,
      end: this.today_str + 'T' + (this.seize + 24) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.seize + 24) + ':' + this.trente,
      end: this.today_str + 'T' + (this.dixSept + 24) + ':' + this.zero,
    },
    //3e jour
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.neuf + 48) + ':' + this.zero,
      end: this.today_str + 'T' + (this.neuf + 48) + ':' + this.trente,
      eventResourceEditable:true,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.neuf + 48) + ':' + this.trente,
      end: this.today_str + 'T' + (this.dix + 48) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.dix + 48) + ':' + this.zero,
      end: this.today_str + 'T' + (this.dix + 48) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.dix + 48) + ':' + this.trente,
      end: this.today_str + 'T' + (this.onze + 48) +':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.onze + 48) + ':' + this.zero,
      end: this.today_str + 'T' + (this.onze + 48) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.onze + 48) + ':' + this.trente,
      end: this.today_str + 'T' + (this.douze + 48) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.treize + 48) + ':' + this.zero,
      end: this.today_str + 'T' + (this.treize + 48) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.treize + 48) + ':' + this.trente,
      end: this.today_str + 'T' + (this.quatorze + 48) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quatorze + 48) + ':' + this.zero,
      end: this.today_str + 'T' + (this.quatorze + 48) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quatorze + 48) + ':' + this.trente,
      end: this.today_str + 'T' + (this.quinze + 48) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quinze + 48) + ':' + this.zero,
      end: this.today_str + 'T' + (this.quinze + 48) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quinze+ 48) + ':' + this.trente,
      end: this.today_str + 'T' + (this.seize + 48) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.seize + 48) + ':' + this.zero,
      end: this.today_str + 'T' + (this.seize + 48) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.seize + 48) + ':' + this.trente,
      end: this.today_str + 'T' + (this.dixSept + 48) + ':' + this.zero,
    },
    //4e jour
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.neuf + 72) + ':' + this.zero,
      end: this.today_str + 'T' + (this.neuf + 72) + ':' + this.trente,
      eventResourceEditable:true,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.neuf + 72) + ':' + this.trente,
      end: this.today_str + 'T' + (this.dix + 72) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.dix + 72) + ':' + this.zero,
      end: this.today_str + 'T' + (this.dix + 72) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.dix + 72) + ':' + this.trente,
      end: this.today_str + 'T' + (this.onze + 72) +':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.onze + 72) + ':' + this.zero,
      end: this.today_str + 'T' + (this.onze + 72) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.onze + 72) + ':' + this.trente,
      end: this.today_str + 'T' + (this.douze + 72) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.treize + 72) + ':' + this.zero,
      end: this.today_str + 'T' + (this.treize + 72) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.treize + 72) + ':' + this.trente,
      end: this.today_str + 'T' + (this.quatorze + 72) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quatorze + 72) + ':' + this.zero,
      end: this.today_str + 'T' + (this.quatorze + 72) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quatorze + 72) + ':' + this.trente,
      end: this.today_str + 'T' + (this.quinze + 72) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quinze + 72) + ':' + this.zero,
      end: this.today_str + 'T' + (this.quinze + 72) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.quinze+ 72) + ':' + this.trente,
      end: this.today_str + 'T' + (this.seize + 72) + ':' + this.zero,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.seize + 72) + ':' + this.zero,
      end: this.today_str + 'T' + (this.seize + 72) + ':' + this.trente,
    },
    {
      id: this.createEventId(),
      start: this.today_str + 'T' + (this.seize + 72) + ':' + this.trente,
      end: this.today_str + 'T' + (this.dixSept + 72) + ':' + this.zero,
    },
  ];
  
  constructor(private router : Router, private priseRdvService:PriseRdvService, private _snackBar: MatSnackBar, private rdvService: RdvService) {


    this.priseForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required]),
      motif: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    });

  }
  ngOnInit(): void {
  }

  currentEvents: EventApi[] = [];

  calendarVisible = true;
    calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay,listWeek'
    },
    buttonText: {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      list: 'Liste',
    },
    initialView: 'timeGridWeek',
    initialEvents: this.events,
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: false,
    timeZone: 'Paris',
    eventClick: this.handleEventAdd.bind(this),
    progressiveEventRendering: true,
  };

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  };

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  };

  handleEventAdd(data:any) {
    let event;
    if (confirm('Prendre ce rendez-vous ?')) { //Si l'utilisateur confirme prendre ce rdv alors l'horaire du rdv est enlevé du calendrier pour qu'un autre utilisateur ne reprenne pas rdv le même jour et même heure
    this.rdvService.postNewRdv(data.event)
     .subscribe(res => {
      console.log(res);
      if(res==null) {
        data.event.setProp('backgroundColor', 'grey');
        data.event.setProp('borderColor', 'grey');
        alert('Ce rendez-vous a déjà été pris ! Veuillez choisir un autre !');
      }
      else if(res['status']=='ok') {
        data.event.setProp('display', 'background');
      };
    });

    };
  };

  createEventId() {
    return String(this.eventGuid++);
  }

  onSubmit() {
    console.log(this.priseForm.value);
    this.priseRdvService.postNewPriseRdv(this.priseForm.value)
      .subscribe(res => {
        console.log(res);
        if(res['status']=='Rendez-vous enregistré') {
          this.openSnackBar("Votre rendez-vous a été pris en compte !", "done");
          this.navigateTo('/mes-rendez-vous');
       }
      })
  }
  
  navigateTo(pageName:string):void {
    this.router.navigate([`${pageName}`]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onClick() {
    if(this.priseForm.invalid){
      alert("Veuillez remplir tous les champs obligatoires !");
    }
  }

}


