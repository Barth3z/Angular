import { GestionrdvComponent } from "../gestionrdv/gestionrdv.component";

export class GestionRdv {
    _id : string ;
    nom:string;
    prenom:string;
    motif:string;
    mail:string;
    start:Date;
    end:Date;

    constructor(){
      this._id = "" ;
      this.nom="";
      this.prenom="";
      this.motif="";
      this.mail="";
      this.start=new Date();
      this.end=new Date();
    }

    setId(_id:string) {
      this._id = _id;
    }
    setNom(nom:string) {
      this.nom=nom;
    }
    setPrenom(prenom:string) {
      this.prenom=prenom;
    }
    setMotif(motif:string) {
      this.motif=motif;
    }
    setMail(mail:string) {
      this.mail=mail;
    }
    setStart(start:Date) {
      this.start=start;
    }
    setEnd(end:Date) {
      this.end=end;
    }
}
