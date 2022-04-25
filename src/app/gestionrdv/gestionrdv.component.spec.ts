import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionrdvComponent } from './gestionrdv.component';
import { NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PriseRdvService } from '../services/prise-rdv.service';
import { GestionRdvService } from '../services/gestion-rdv.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('GestionrdvComponent', () => {
  let component: GestionrdvComponent;
  let fixture: ComponentFixture<GestionrdvComponent>;
  let element: HTMLElement;
  let priseRdvService: PriseRdvService;
  let gestionrdvService: GestionRdvService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, MatSnackBarModule, ReactiveFormsModule],
      declarations: [ GestionrdvComponent ],
      providers: [PriseRdvService, GestionRdvService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionrdvComponent);
    component = fixture.componentInstance;
    gestionrdvService = TestBed.get(GestionRdvService);
    priseRdvService = TestBed.get(PriseRdvService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.dataSource).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.mail).toBeFalsy();
  });

  it('should be defined', () => {
    expect(component.rdv).toBeTruthy();
  });

/*  it('should be called once', () => {
    spyOn(component, 'getRdvs');
    component.mail = 'jean@gmail.com';
    component.afterNgViewInit();
    if(component.mail.length>0) {
      expect(component.getRdvs).toHaveBeenCalledTimes(1)
    };
  });*/

  it('should be called once', () => {
    spyOn(component, 'onEdit');
    spyOn(component, 'navigateTo');
    const route = component.navigateTo('/prise-de-rendez-vous');
    const click = fixture.debugElement.query(By.css('a')).nativeElement;
    click.click();
    expect(component.navigateTo).toHaveBeenCalledTimes(1);
  });

  it('should be called once', () => {
    spyOn(component, 'openSnackBar');
    spyOn(component, 'onDelete');
    const message = component.openSnackBar('Rendez-vous supprimé avec succès !', 'ok');
    const click = fixture.debugElement.query(By.css('a')).nativeElement;
    click.click();
    expect(component.openSnackBar).toHaveBeenCalledTimes(1);
  });

  it('should not be called by clicking a button', () => {
    let element;
    spyOn(component, 'onDelete');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.onDelete).toHaveBeenCalledTimes(0);
  });

  it('should not be called by clicking a button', () => {
    let element;
    spyOn(component, 'onEdit');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.onEdit).toHaveBeenCalledTimes(0);
  });
});
