import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PriseRdv } from '../models/prise-rdv';
import { PriseRdvComponent } from '../prise-rdv/prise-rdv.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriseRdvService {

  selectedNewPriseRdv: PriseRdv;
  newRdv: PriseRdv[]=[];
  readonly URL = ('http://localhost:3000/authentificated/user/prise-rdv');

  constructor(private http: HttpClient) {
    this.selectedNewPriseRdv = new PriseRdv();
  }

    /**
   * Cette méthode postNewPriseRdv(newRdv: PriseRdv) permet la création de rendez-vous qui seront enregistré dans la base de données.
   * @param newRdv est un objet de type PriseRdv qui va permettre la création d'un rendez-vous lorsque l'utilisateur va rentrer ses données personnelles. 
   * @returns Sa retourne la demande de la requête qui va générer une réponse selon le choix de l'utilisateur.
   */
  postNewPriseRdv(newRdv: PriseRdv): Observable<any> {
    return this.http.post(this.URL, newRdv);
  };
  
    /**
   * Cette méthode permet d'afficher tous les rendez-vous pris par chaque patients ce qui permets d'optimiser la charge de travail du docteur.
   * @returns Sa retourne la demande de la requête qui va générer une réponse, cette réponse permet d'afficher tous les rendez-vous pris par les patients pour le docteur.
   */
  getNewPriseRdvs(): Observable<any> {
    return this.http.get(this.URL + '/borna')
  };

}
