import { InscriptionComponent } from '../inscription/inscription.component';

export class Inscription {

  _id: string;
  nom: string;
  prenom: string;
  age: string;
  genre: string;
  mail: string;
  phone: string;
  mdp: string;
  mdpc: string;

  constructor() {
    this._id="";
    this.nom="";
    this.prenom="";
    this.age="";
    this.genre="";
    this.mail="";
    this.phone="";
    this.mdp="";
    this.mdpc="";
  }

}
