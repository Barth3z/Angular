import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { GestionRdv } from '../models/gestion-rdv';
import { GestionRdvService } from '../services/gestion-rdv.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RdvService } from '../services/rdv.service';

const ELEMENT_DATA: GestionRdv[] = [
];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-gestionrdv',
  templateUrl: './gestionrdv.component.html',
  styleUrls: ['./gestionrdv.component.css']
})

export class GestionrdvComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prenom', 'mail', 'start', 'end', 'motif', 'action'];
  dataSource: MatTableDataSource<GestionRdv>;
  mail:string;
  rdv:GestionRdv;

  constructor(private router : Router, private gestionRdvService:GestionRdvService, private _snackBar: MatSnackBar, private rdvService: RdvService){
    this.dataSource = new MatTableDataSource();
    this.mail="";
    this.rdv = new GestionRdv;
  }

  ngOnInit() {
    //this.dataSource = ELEMENT_DATA;

  }

  /**
* This method is called after Angular has fully initialized the component's view
*/
  afterNgViewInit() {
    if(this.mail==null) {
      this.getRdvs();
    }
  }

/**
* This method ask data to the database to get the data
*/
  getRdvs(){
    this.gestionRdvService.getNewGestionRdv(this.mail).subscribe((data: any) => {
        console.log(data);
        const rdv = data;
        this.dataSource = new MatTableDataSource(rdv);
    });
  }
/**
* This method delete the data of the database
* @param element - The data selected
*/
  onDelete(element:any) {
    if(confirm('Supprimer ce rendez-vous ?')) {
      console.log(this.rdv.start);
      this.rdv.setNom(element.nom);
      this.rdv.setPrenom(element.prenom);
      this.rdv.setMotif(element.motif);
      this.rdv.setMail(element.mail);
      this.rdv.setStart(element.start);
      this.rdv.setEnd(element.end);
      this.gestionRdvService.deleteNewGestionRdv(this.rdv.start).subscribe(res => {
        console.log(res);
        this.openSnackBar('Rendez-vous supprimé avec succès !', 'done');
      });
      /*this.rdvService.deleteNewRdv(this.rdv.start).subscribe(res => {
        console.log(res);
      })*/
    }
  }
/**
* This method edit the data of the database
* @param element - The data selected
*/
  onEdit(element:any) {
    if(confirm('Voulez-vous modifier votre rendez-vous ?')) {
      this.rdv.setNom(element.nom);
      this.rdv.setPrenom(element.prenom);
      this.rdv.setMotif(element.motif);
      this.rdv.setMail(element.mail);
      this.rdv.setStart(element.start);
      this.rdv.setEnd(element.end);
      this.gestionRdvService.deleteNewGestionRdv(this.rdv.start).subscribe(res => {
        console.log(res);
      });
      this.navigateTo('/prise-de-rendez-vous');
    }
  }

/**
* This method allows to navigate to another web page
* @param pageName - An address to access the page
*/
  navigateTo(pageName:string):void {
    this.router.navigate([`${pageName}`]);
  }
/**
* This method allows the user to be warned of a "notification"
* @param message - The notification
* @param action - A pseudo-button to remove the message
*/
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}