import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { InscriptionService } from '../services/inscription.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Cette partie permet à angular d'etablir l'accès à la structure, la mise en plage et d'instancier le service inscription.
 */
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers: [InscriptionService]
})

/**
 * Cette partie permet de structurer et d'initialiser la classe InscriptionComponent.
 */
export class InscriptionComponent implements OnInit {

  nom:string;
  prenom:string;
  age:string;
  mail:string;
  mdp:string;
  mdpc:string;
  genre:string;
  phone:string;
  isChecked:boolean;
  msgErrorTaillePhone = "Un numéro de téléphone comporte 10 chiffres !";
  msgErrorNoPhone = "Veuillez entrez votre numéro de téléphone portable !";
  isNotPhone:boolean;
  msgErrorMail = "Veuillez entrer un mail valide !";
  isNotMail:boolean;
  msgErrorMdp = "Votre mot de passe doit être compris entre 8 caractères et 16 aux maximum, et doit contenir au moins un chiffre, un symbole et une lettre majuscule et minuscule !";
  notMdp:boolean;
  msgErrorMdpc = "Vos mot de passe ne se correspondent pas !";
  notMdpc:boolean;

  isNumber=false;
  isMail=false;
  mdpOk=false;
  isMajeur=false;

  constructor(private inscriptionService: InscriptionService, private router : Router, private _snackBar: MatSnackBar) {
    this.nom="";
    this.prenom="";
    this.age="";
    this.mail="";
    this.mdp="";
    this.genre="";
    this.mdpc="";
    this.phone="";
    this.isChecked=false;
    this.isNotPhone=false;
    this.isNotMail=false;
    this.notMdp=false;
    this.notMdpc=false;
  }
  /**
  * cette fonction permet d'afficher qu'importe la situation, ce que le developpeur écrit.
  */
  ngOnInit(): void {
  }

 /**
   * cette fonction permet de verifier l'age d'un utilisateur qui veux s'inscrire s'il est majeur ou mineur
   * @returns renvoie True si l'utilisateur est majeur et affiche un message s'il est mineur 
   */
  verifAge():boolean { //Vérifie si l'utilisateur est majeur ou mineur
      if(this.age < "18") {
        alert("Vous êtes mineur vous ne pouvez pas créer de compte en votre nom");
      }
      else {
        this.isMajeur = true;
      }
      return this.isMajeur;
  }

 /**
 * cette fonction permet de verifier qu'un numéro de téléphone entré par l'utilisateur est conforme 
 * @returns renvoie vrai si le numero entre est correcte et conforme 
 */
  verifPhone():boolean { //Vérifie si c'est un numéro conforme
    //Attributs
    let i=0;
    //Si la saisie ne correspond pas à un numéro de téléphone
    if(this.phone.length>10 || this.phone.length<10) {
      this.isNotPhone=true;
    }
    else {
      while(i<10 && typeof(parseInt(this.phone[i]))=="number" && !isNaN(parseInt(this.phone[i]))) { //Vérifie si le numéro ne comporte pas de lettre
        i++;
        if(i==10) {
          this.isNumber=true;
        }
      }
      if(!this.isNumber) { //Si le numéro comporte des lettres
        alert("Un numéro de téléphone ne doit comporter que de chiffres !");
      }
    }
    return this.isNumber;
  }

/**
  * cette fontion permet de verifier qu'un mail est conforme et bien ecrit
  * @returns renvoie True si le mail est conforme sinon il renvoie False
  */
  verifMail(): boolean { //Vérifie si c'est un mail conforme
    //Attributs
    let i=0;

    if(!this.mail.match(/[a-z0-9-.]+@[a-z0-9]+.[a-z]+/i)) { //Vérifi si c'est un mail
      this.isNotMail=true;
    }
    else {
      this.isMail = true;
    }
    return this.isMail;
  }

/**
   * cette fonction permet de verifier qu'un mot de passe est conforme et que le mot de passe et le mot de passe de confirmation sont bien identique
   * @returns retourne Vrai si les deux mot de passe son identique, False sinon 
   */
  verifMdp(): boolean { //Vérifie si le mail est conforme et si les mot de passe sont les mêmes
    //Attributs
    let i=0;

    if(this.mdp.length<=16 && this.mdp.length >=8) {
      for(i; i<this.mdp.length; i++) {
        if(this.mdp[i]>='!' && this.mdp[i]<='~') {
          this.mdpOk = true;
        }
        else {
          this.mdpOk = false;
        }
      }
      if(this.mdpOk) {
        if(this.mdp!==this.mdpc){
          this.notMdpc=true;
        }
      }
    }
    else {
      this.mdpOk=false;
    }
    if(!this.mdpOk) {
      this.notMdp=true;
    }
    return this.mdpOk;
  }

/**
   * permet de rediriger vers la page page d'acceuil
   * @param pageName 
   */
  navigateTo(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

/**
   * cette fonction permet d'ajouter un nouvel utilisateur lors de son inscription
   * @param form ce parametre permet d'avoir les valeur d'un utilisateur et de les mettre dans la base de donnée
   */
  addNewUser(form: NgForm) {
    if(this.verifPhone() && this.verifMail() && this.verifMdp() && this.isChecked && this.verifAge()){
      this.inscriptionService.postNewUtilisateur(form.value)
      .subscribe(res => {
        console.log(res);
        if(res['status'] == 'User saved') {
          this.navigateTo("/");
          this.openSnackBar("Votre inscription a été un succès !", "done");
        }
        else if(res['status']=='Mail ou téléphone déjà utilisé') {
          alert('Le mail ou le numéro de téléphone a déjà été utilisé !');
        }
      });
    }
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

/**
   * cette fonction permet lors d'un clique de valider une inscription si tout les champs sont bien rempli comme demander 
   */
  onClick() {
    if(this.nom.length<=0 || this.prenom.length<=0 || this.age.length<=0 || this.genre.length<=0 || this.mail.length<=0 || this.phone.length<=0 || this.mdp.length<=0 || this.mdpc.length<=0){
      alert("Veuillez remplir tous les champs obligatoires !");
    }
    if(!this.isChecked){
      alert("Veuillez accepter les conditions générales !");
    }
  }
}
