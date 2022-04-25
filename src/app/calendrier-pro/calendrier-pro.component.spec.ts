import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendrierProComponent } from './calendrier-pro.component';
import { NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EventsService } from '../services/events.service';
import { PriseRdvService } from '../services/prise-rdv.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CalendrierProComponent', () => {
  let component: CalendrierProComponent;
  let fixture: ComponentFixture<CalendrierProComponent>;
  let element: HTMLElement;
  let priseRdvService: PriseRdvService;
  let service : EventsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, MatSnackBarModule, ReactiveFormsModule],
      declarations: [ CalendrierProComponent, AppComponent],
      providers: [PriseRdvService, EventsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierProComponent);
    component = fixture.componentInstance;
    service = TestBed.get(EventsService);
    priseRdvService = TestBed.get(PriseRdvService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.displayedColumns).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.rdv).not.toBeFalsy();
  });

  it('should be defined', () => {
    expect(component.eventForm).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.dataSource).not.toBeFalsy();
  });

  it('should be defined', () => {
    expect(component.calendarOptions).toBeTruthy();
  });

  it('should be called once', () => {
    spyOn(component, 'handleCalendarToggle');
    const click = fixture.debugElement.query(By.css('.calendrier')).nativeElement;
    click.click();
    expect(component.handleCalendarToggle).toHaveBeenCalledTimes(1);
  });

  it('should be called once', () => {
    spyOn(component, 'handleWeekendsToggle');
    const click = fixture.debugElement.query(By.css('.we')).nativeElement;
    click.click();
    expect(component.handleWeekendsToggle).toHaveBeenCalledTimes(1);
  });

  it('should be called once', () => {
    spyOn(component, 'getAllEvents');
    spyOn(component, 'ngOnInit');
    const click = fixture.debugElement.query(By.css('#calendar')).nativeElement;
    click.click();
    expect(component.getAllEvents).toHaveBeenCalledTimes(0);
  });

  it('should be post', () => {
    let form = component.eventForm;
    component.eventForm.controls['title'].setValue('Sport');
    component.eventForm.controls['start'].setValue('2022-04-19T22:00:00:000Z');
    component.eventForm.controls['end'].setValue('2022-04-19T22:30:00:000Z');
    spyOn(component, 'ajouterEvent');
    let post = service.postEvents(form.value);
    expect(post).toBeTruthy();
  });

  it('should not be called by clicking the button', () => {
    let form = component.eventForm;
    component.eventForm.controls['title'].setValue('Sport');
    component.eventForm.controls['start'].setValue('2022-04-19T22:00:00:000Z');
    component.eventForm.controls['end'].setValue('2022-04-19T22:30:00:000Z');
    spyOn(component, 'ajouterEvent');
    service.postEvents(form.value);
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.ajouterEvent).toHaveBeenCalledTimes(1);
  });

  it('should not be called by clicking the button', () => {
    spyOn(component, 'supprimerEvent');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.supprimerEvent).toHaveBeenCalledTimes(0);
  });

  it('should be called once', () => {
    spyOn(component, 'openSnackBar');
    spyOn(component, 'ajouterEvent');
    spyOn(component, 'supprimerEvent');
    const messageAdd = component.openSnackBar('Rendez-vous enregistré !', 'ok');
    const messageSup = component.openSnackBar('Rendez-vous supprimé !', 'ok');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.openSnackBar).toHaveBeenCalledTimes(2);
  });

  describe("Veuillez remplir les champs avant de créer l\'évènement !", function(){
    beforeEach(() => {
        jasmine.setDefaultSpyStrategy(and => and.returnValue("Veuillez remplir les champs avant de créer l\'évènement !"));
    });

    it("returns the value Veuillez remplir les champs avant de créer l\'évènement !", function(){
      var spy = jasmine.createSpy();
      const click = fixture.debugElement.query(By.css('button')).nativeElement;
      click.click();
      if((expect(component.eventForm.valid).toBeFalsy)){
        expect(spy()).toEqual("Veuillez remplir les champs avant de créer l\'évènement !");
      }
    });
  });

});
