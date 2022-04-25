import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-connexion-pro',
  templateUrl: './connexion-pro.component.html',
  styleUrls: ['./connexion-pro.component.css']
})
export class ConnexionProComponent implements OnInit {

  mail:string;
  mdp:string;

  constructor(private router:Router, private _snackBar: MatSnackBar) {
    this.mail="";
    this.mdp="";
  }
     /**
   * ngOnInit() permet d'afficher qu'importe la situation, ce que le développeur écrit. 
   */
  ngOnInit(): void {
  }
  
  /**
   *  La fonction NavigateTo(pageName:string) permet de faire naviguer les pages entre elles. C'est-à-dire que pour aller vers la page 1 vers la page 2 et vice-versa , il faut appeller cette fonction.  
   * @param pageName est un paramètre de cette foncton qui permet de spécifier sur quelle page l'utilisateur veux naviguer.
   */
  navigateTo(pageName:string):void {
    this.router.navigate([`${pageName}`]);
  }

    /**
   *  Cette fonction openSnackBar(message: string, action: string) permet d'afficher un message en bas de page selon ce que le développeur requiert.
   * @param message Ce paramètre permet à l'utilisateur d'écrire un message qui va par la suite être affiché grâce au paramètre action.
   * @param action  Ce paramètre permet d'afficher le message écrit.
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

    /**
   * La fonction onClick() permet de vérifier si les champs mail et mdp ne correponde pas à une chaîne vide. Si c'est pas le cas, ici le docteur doit rentrer ses données personnelles pour pouvoir se conncter à son calendrier. 
   */
  onClick() {
    if(this.mail.length==0 && this.mdp.length==0) {
      alert("Veuillez remplir tous les champs ! ");
    }
    else {
      if(this.mail=="mylene.thompson@gmail.com" && this.mdp=="mylene1234") {
        this.openSnackBar("Connexion réussis !", "done");
        this.navigateTo("/calendrier");
      }
      else {
        alert("Mail ou mot de passe incorrect !");
      }
    }
  }

}
