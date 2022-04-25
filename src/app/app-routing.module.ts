import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageDAccueilComponent } from "./page-d-accueil/page-d-accueil.component";
import { ConnexionComponent } from "./connexion/connexion.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { CalendrierProComponent } from "./calendrier-pro/calendrier-pro.component";
import { PriseRdvComponent } from "./prise-rdv/prise-rdv.component";
import { ConnexionProComponent } from "./connexion-pro/connexion-pro.component";
import { GestionrdvComponent } from "./gestionrdv/gestionrdv.component";

const routes: Routes = [
  { path: "", component: PageDAccueilComponent, pathMatch: "prefix"},
  { path: "connexion", component: ConnexionComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "prise-de-rendez-vous", component: PriseRdvComponent },
  { path: "calendrier", component: CalendrierProComponent },
  { path: "connexion-professionnelle", component: ConnexionProComponent },
  { path: "mes-rendez-vous", component: GestionrdvComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
