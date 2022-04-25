import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GestionRdv } from '../models/gestion-rdv';
import { GestionrdvComponent } from '../gestionrdv/gestionrdv.component';
import { Observable, throwError } from 'rxjs';
import { ReadVarExpr } from '@angular/compiler';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestionRdvService {

  selectedNewGestionRdv: GestionRdv;
  newGestion: GestionRdv[]=[];
  readonly URL = ('http://localhost:3000/authentificated/user/gestionrdv');

  constructor(private http: HttpClient)  {
    this.selectedNewGestionRdv = new GestionRdv();
  }

    /**
   * Cette fonction getNewGestionRdv(mail:string):Observable<any> permet d'afficher les rendez-vous d'un utilsateur à l'aide du mail.
   * @param mail est un string qui permet d'aider pour afficher les rendez-vous.
   * @returns sa retourne la réponse à la requête(exemple : si un utilisateur entre un mail , la réponse renvoyé sera tous les rendez-vous pris à l'aide de ce mail).Sa retourne la demande de la requête qui va générer une réponse selon le choix de l'utilisateur.
   */
  getNewGestionRdv(mail:string):Observable<any> {
    return this.http.get(this.URL+`/${mail}`)
      .pipe(
        map((data:any) => {
          console.log(data);
          return data;
        }),
        catchError(error => {
          return throwError('Erreur');
        })
      )
  };

    /**
   * Cette méthode deleteNewGestionRdv(rdv: GestionRdv):Observable<any> permet la suppression d'un rendez-vous qu'un utilisateur a choisi.
   * @param rdv permet de supprimer le rendez-vous que l'utilisateur veut supprimer.
   * @returns sa retourne la réponse selon si la donnée existe  dans la base de données. Sa retourne la demande de la requête qui va générer une réponse selon le choix de l'utilisateur.
   */
  deleteNewGestionRdv(start:Date): Observable<any> {
    console.log(this.URL+`/${start}`);
    return this.http.delete(this.URL+`/${start}`)
      .pipe(
        map((data:any) => {
          return data;
        }),
        catchError(error => {
          return throwError('Error');
        })
      )
  };

}
