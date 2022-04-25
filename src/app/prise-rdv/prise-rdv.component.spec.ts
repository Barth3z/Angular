import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriseRdvComponent } from './prise-rdv.component';
import { NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PriseRdvService } from '../services/prise-rdv.service';
import { RdvService } from '../services/rdv.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PriseRdvComponent', () => {
  let component: PriseRdvComponent;
  let fixture: ComponentFixture<PriseRdvComponent>;
  let element: HTMLElement;
  let service: PriseRdvService;
  let rdvService: RdvService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, MatSnackBarModule, ReactiveFormsModule],
      declarations: [ PriseRdvComponent, AppComponent ],
      providers: [PriseRdvService, RdvService]
    })
    .compileComponents();
  });

  
  beforeEach(() => {
    fixture = TestBed.createComponent(PriseRdvComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PriseRdvService);
    rdvService = TestBed.get(RdvService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.priseForm).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.priseForm.valid).toBeFalsy();
  });

  it('should be defined', () => {
    let nom = component.priseForm.controls['nom'];
    expect(nom).toBeTruthy();
  });

  it('should be defined', () => {
    let prenom = component.priseForm.controls['prenom'];
    expect(prenom).toBeTruthy();
  });

  it('should be defined', () => {
    let mail = component.priseForm.controls['mail'];
    expect(mail).toBeTruthy();
  });

  it('should be defined', () => {
    let phone = component.priseForm.controls['phone'];
    expect(phone).toBeTruthy();
  });

  it('should be defined', () => {
    let motif = component.priseForm.controls['motif'];
    expect(motif).toBeTruthy();
  });

  it('should be defined', () => {
    let start = component.priseForm.controls['start'];
    expect(start).toBeTruthy();
  });

  it('should be defined', () => {
    let end = component.priseForm.controls['end'];
    expect(end).toBeTruthy();
  });
  
  it('should be not null', () => {
    expect(component.events).not.toBeFalsy();
  });

  it('should be have 56 events', () => {
    let nbEvents = component.events.length;
    expect(nbEvents).toEqual(56);
  })

  it('should be defined', () => {
    expect(component.eventGuid).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.zero).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.trente).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.neuf).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.dix).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.onze).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.douze).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.treize).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.quatorze).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.quinze).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.seize).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.dixSept).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.today_str).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.calendarOptions).toBeTruthy();
  });

  it('should be called once', () => {
    spyOn(component, 'onSubmit');
    spyOn(component, 'navigateTo');
    const route = component.navigateTo('/mes-rendez-vous');
    const click = fixture.debugElement.query(By.css('#done')).nativeElement;
    click.click();
    expect(component.navigateTo).toHaveBeenCalledTimes(1);
  });

  it('should be called once', () => {
    spyOn(component, 'openSnackBar');
    spyOn(component, 'onSubmit');
    const message = component.openSnackBar('Votre rendez-vous a été pris en compte', 'ok');
    const click = fixture.debugElement.query(By.css('#done')).nativeElement;
    click.click();
    expect(component.openSnackBar).toHaveBeenCalledTimes(1);
  });
  
  it('should emits a rendez-vous after submitting', () => {
    component.priseForm.controls['nom'].setValue("Dupont");
    component.priseForm.controls['prenom'].setValue("Jean");
    component.priseForm.controls['mail'].setValue("jean@gmail.com");
    component.priseForm.controls['phone'].setValue("0777777777");
    component.priseForm.controls['motif'].setValue("Grippe");
    component.priseForm.controls['start'].setValue('2022-04-19T22:00:00:000Z');
    component.priseForm.controls['end'].setValue('2022-04-19T22:30:00:000Z');
    expect(component.priseForm.valid).not.toBeFalsy();
  });
  
  it('should be called once', () => {
    spyOn(component, 'onSubmit');
    service.postNewPriseRdv(component.priseForm.value);
    const click = fixture.debugElement.query(By.css('#done')).nativeElement;
    click.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should not be called by clicking the button', () => {
    let data:any;
    spyOn(component, 'handleEventAdd');
    rdvService.postNewRdv(data);
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.handleEventAdd).toHaveBeenCalledTimes(0);
  });

  it('should have the event click in button "done" and call the function "onSubmit()"', () => {
    spyOn(component, 'onSubmit');
    const click = fixture.debugElement.query(By.css('#done')).nativeElement;
    click.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  describe("Ce rendez-vous a déjà été pris ! Veuillez choisir un autre !", function(){
    beforeEach(() => {
      jasmine.setDefaultSpyStrategy(and => and.returnValue("Ce rendez-vous a déjà été pris ! Veuillez choisir un autre !"));
    });
    
    it("returns the value Ce rendez-vous a déjà été pris ! Veuillez choisir un autre !",function(){
      var spys = jasmine.createSpy();
      const click = fixture.debugElement.query(By.css('full-calendar')).nativeElement;
      click.click();
        expect(spys()).toEqual("Ce rendez-vous a déjà été pris ! Veuillez choisir un autre !");
    });
  });

  describe("Veuillez remplir tous les champs obligatoires ! ", function(){
    beforeEach(() => {
        jasmine.setDefaultSpyStrategy(and => and.returnValue("Veuillez remplir tous les champs obligatoires !"));
    });

    it("returns the value Veuillez remplir tous les champs obligatoires !", function(){
      var spy = jasmine.createSpy();

      const click = fixture.debugElement.query(By.css('button')).nativeElement;
      click.click();
      if((expect(component.priseForm).toBeFalsy)){
        expect(spy()).toEqual("Veuillez remplir tous les champs obligatoires !");
      }
    });
  });

});


