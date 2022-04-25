import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../models/inscription';
import { InscriptionComponent } from '../inscription/inscription.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  selectedNewUtilisateurs: Inscription;
  newUtilisateurs: Inscription[]=[];
  readonly URL = 'http://localhost:3000/authentificated/user';

  constructor(private http: HttpClient) {
    this.selectedNewUtilisateurs = new Inscription();
  }

  getNewUtilisateurs(): Observable<any> {
    return this.http.get(this.URL);
  };

  /**
   * Cette méthode postNewUtilisateur(newUtilisateur: User): Observable<any> permet de créer un compte pour un utilisateur.
   * @param newUtilisateur permet la création d'un objet de type User qui va servir à créer un compte.
   * @returns Sa retourne la demande de la requête qui va générer une réponse selon les données que l'utilisateur va rentrer.
   */
  postNewUtilisateur(newUtilisateur: Inscription): Observable<any> {
    return this.http.post(this.URL, newUtilisateur);
  };

  putNewUtilisateur(newUtilisateur: Inscription): Observable<any> {
    return this.http.put(this.URL+`${newUtilisateur._id}`, newUtilisateur);
  };

  deleteNewUtilisateur(_id: string): Observable<any> {
    return this.http.delete(this.URL+`${_id}`);
  };
}
