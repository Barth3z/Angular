import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import { AppComponent } from './app.component';
import { PageDAccueilComponent } from './page-d-accueil/page-d-accueil.component';
import { InscriptionComponent } from './inscription/inscription.component'; //Import des modules d'angular material
import { ConnexionComponent } from './connexion/connexion.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PriseRdvComponent } from './prise-rdv/prise-rdv.component';
import { CalendrierProComponent } from './calendrier-pro/calendrier-pro.component';
import { ConnexionProComponent } from './connexion-pro/connexion-pro.component';
import { GestionrdvComponent } from './gestionrdv/gestionrdv.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { InscriptionService } from './services/inscription.service';
import { ConnexionService } from './services/connexion.service';
import { RdvService } from './services/rdv.service';
import { PriseRdvService } from './services/prise-rdv.service';
import { GestionRdvService } from './services/gestion-rdv.service';
import { EventsService } from './services/events.service';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    PageDAccueilComponent,
    InscriptionComponent,
    ConnexionComponent,
    PageNotFoundComponent,
    PriseRdvComponent,
    CalendrierProComponent,
    ConnexionProComponent,
    GestionrdvComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],

  providers: [InscriptionService, ConnexionService, RdvService, PriseRdvService, GestionRdvService, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
