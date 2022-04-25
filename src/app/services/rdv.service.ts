import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rdv } from '../models/rdv';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  selectedNewRdv: Rdv;
  newRdv: Rdv[] = [];
  readonly URL = ('http://localhost:3000/authentificated/user/rdv');

  constructor(private http: HttpClient) {
    this.selectedNewRdv = new Rdv();
  }


  getNewRdvs(): Observable<any> {
    return this.http.get(this.URL + '/borna')
    .pipe(
      map((data:any) => {
        console.log(data);
        return data;
      }),
      catchError(error => {
        return throwError('err');
      })
    )
  };
  /**
   * Cette méthode postNewRdv(newRdv: Rdv): Observable<any> permet de prendre une date que l'utilisateur choisira via le calendrier et qui s'enregistrera dans la base de données.
   * @param newRdv est un objet de type Rdv qui permet d'enregistrer dans la base de données l'heure à laquelle le rendez-vous commence et finit.
   * @returns Sa retourne la demande de la requête qui va générer une réponse selon le choix de l'utilisateur.
   */
  postNewRdv(newRdv: Rdv): Observable<any> {
    return this.http.post(this.URL, newRdv);
  };
}