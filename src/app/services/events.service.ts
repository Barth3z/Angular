import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '../models/events';
import { CalendrierProComponent } from '../calendrier-pro/calendrier-pro.component';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  selectedEvents: Events;
  events: Events[] = [];
  readonly URL = ('http://localhost:3000/authentificated/user/events');

  constructor(private http: HttpClient) {
    this.selectedEvents = new Events();
  }

    /**
   * Cette méthode postEvents(event: Events): Observable<any> permet la création d'un rendez-vous ou d'un autre évènement qui s'affichera sur le calendrier professionelle du docteur.
   * @param event permet de créer un évènement qui sera afficher dans le calendrier
   * @returns sa renvoie la réponse que le docteur a entrée lors de la création de l'évènements, cette création va être enregistrer dans la base de données. Sa retourne la demande de la requête qui va générer une réponse selon le choix de l'utilisateur.
   */
  postEvents(event: Events): Observable<any> {
    return this.http.post(this.URL, event);
  };
  
    /**
   * Cette méthode getEvents(): Observable<any> permet d'afficher tous les évènements sur le calendrier du docteur.
   * @returns sa retourne une réponse où sa affiche tous les évènements créés par le médecin. Sa retourne la demande de la requête qui va générer une réponse selon le choix de l'utilisateur.
   */
  getEvents(): Observable<any> {
    return this.http.get(this.URL + '/borna')
      .pipe(
        map((data:any) => {
          console.log(data);
          return data;
        }),
        catchError(error => {
          return throwError('Erreur');
        })
      )
  }
  
    /**
   * Cette méthode deleteEvent(start: Date): Observable<any> permet de supprimer un rendez-vous choisi par le docteur. 
   * @param start permet de choisir la date à laquelle le docteur souhaite supprimer l'évènement.
   * @returns sa retourne une réponse où sa supprime le rendez-vous que le docteur souhaite supprimer. Sa retourne la demande de la requête qui va générer une réponse selon le choix de l'utilisateur.
   */
  deleteEvent(start:Date):Observable<any> {
    console.log(this.URL + `/${start}`);
    return this.http.delete(this.URL + `/${start}`)
      .pipe(
        map((data:any) => {
          return data;
        }),
        catchError(error => {
          return throwError('err');
        })
      )
  }

}

