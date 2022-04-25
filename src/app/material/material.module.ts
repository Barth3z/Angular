import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider'; //Slide bar
import { MatButtonModule } from '@angular/material/button'; //Bouton simple
import { MatButtonToggleModule } from '@angular/material/button-toggle'; //plrs bouton
import { MatCheckboxModule } from '@angular/material/checkbox'; //Case à cocher
import { MatIconModule } from '@angular/material/icon'; //Icone
import { MatToolbarModule } from '@angular/material/toolbar'; //Conteneur : bar à outils en en-tête
import { MatFormFieldModule } from '@angular/material/form-field'; //Zone de saisie
import { MatSelectModule } from '@angular/material/select'; //Selection/option
import { MatCardModule } from '@angular/material/card'; //Conteneur
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'; //Box de dialog
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'; //Calendrier
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';

const MaterialComponents = [
  MatSliderModule,
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatTableModule,
  MatSidenavModule
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports : [
    MaterialComponents
  ]
})
export class MaterialModule { }
