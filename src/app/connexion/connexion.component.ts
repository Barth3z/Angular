import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

/**
 * Cette partie permet à angular d'etablir l'accès à la structure, la mise en plage et d'instancier le service connexion.
 */
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  providers: [ConnexionService]
})

/**
 * Cette partie permet de structurer et d'initialiser la classe ConnexionComponent.
 */
export class ConnexionComponent implements OnInit {

  mail:string;
  mdp:string;

  constructor(private router:Router, private connexionService: ConnexionService, private _snackBar: MatSnackBar) {
    this.mail="";
    this.mdp="";
  }
  
/**
  * ngOnInit() permet d'afficher qu'importe la situation, ce que le developpeur écrit.
  */
  ngOnInit(): void {
  }
/**
  * Cette fonction loginUser() permet de verifier si un utilisateur à correctement saisie son mot de passe ou son adresse mail. Si oui, il est rediriger vers la page prise de rendez-vous.
  */
  loginUser(form: NgForm) { 
    if(this.mail.length > 0 && this.mdp.length >0){
      console.log(form.value);
      this.connexionService.postUtilisateur(form.value)
        .subscribe(res => {
          console.log(res);
          if(res['status']=='Mot de passe ou mail incorrect') {
            alert("Votre adresse mail ou mot de passe sont incorrect !");
          }
          else {
            this.openSnackBar("Connexion réussis ! ", "done");
            this.navigateTo('/prise-de-rendez-vous');
          }
        });
    }
  }

/**
  * Cette fonction navigateTo() permet de rediriger vers la page prise de rendez-vous.
  * @param pageName 
  */
  navigateTo(pageName:string):void {
    this.router.navigate([`${pageName}`]);
  }

/**
  * Cette fonction openSnackBar() permet d'informer à un utilisateur que la connexion est établis .
  * @param message 
  * @param action 
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

/**
  * Cette fonction onClick() permet d'informer à l'ulilisateur de remplir de tous les champs requis.
  */
  onClick() {
    if(this.mail.length==0 && this.mdp.length==0) {
      alert("Veuillez remplir tous les champs ! ");
    }
  }

}
