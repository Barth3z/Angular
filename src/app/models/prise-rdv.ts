import { PriseRdvComponent } from '../prise-rdv/prise-rdv.component';

export class PriseRdv {

  _id:string;
  nom:string;
  prenom:string;
  mail:string;
  phone:string;
  motif:string;
  start:Date;
  end: Date;

  constructor() {
    this.mail="";
    this.nom="";
    this.prenom="";
    this.phone="";
    this.motif="";
    this._id="";
    this.start=new Date();
    this.end=new Date();
  }

}
