import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Connexion } from '../models/connexion';
import { ConnexionComponent } from '../connexion/connexion.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  selectedUtilisateur: Connexion;
  utilisateur: Connexion[]=[];
  readonly URL = 'http://localhost:3000/authentificated/user/login';

  constructor(private http: HttpClient) {
    this.selectedUtilisateur = new Connexion();
  }
  
    /**
   * Cette méthode postUtilisateur(utilisateur: Connexion): Observable<any> permet la connexion d'un utilisateur si les données entrées existent dans la base de données.
   * @param utilisateur est un objet de type Connexion qui permet la connexion d'un utilisateur  au site web.
   * @returns Sa retourne la demande de la requête qui va générer une réponse selon les données personnelles de l'utilisateur.
   */
  postUtilisateur(utilisateur: Connexion): Observable<any> {
    return this.http.post(this.URL, utilisateur);
  };

}
