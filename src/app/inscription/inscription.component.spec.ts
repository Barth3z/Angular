import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionComponent } from './inscription.component';
import { NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InscriptionService } from '../services/inscription.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;
  let element: HTMLElement;
  let service: InscriptionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, MatSnackBarModule],
      declarations: [InscriptionComponent, AppComponent],
      providers: [InscriptionService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    service = TestBed.get(InscriptionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component.nom).toBeDefined();
  });

  it('should be defined', () => {
    expect(component.prenom).toBeDefined();
  });

  it('should be defined', () => {
    expect(component.age).toBeDefined();
  });

  it('should be defined', () => {
    expect(component.genre).toBeDefined();
  });

  it('should be defined', () => {
    expect(component.mail).toBeDefined();
  });

  it('should be defined', () => {
    expect(component.phone).toBeDefined();
  });

  it('should be defined', () => {
    expect(component.mdp).toBeDefined();
  });

  it('should be defined', () => {
    expect(component.mdpc).toBeDefined();
  });

  it('should post data', () => {
    const form = fixture.debugElement.nativeElement.querySelector('#inscriptionForm');
    service.postNewUtilisateur(form);
    
  });

  it('should have the event click in button "done" and call the function "addNewUser()"', () => {
    spyOn(component, 'addNewUser');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.addNewUser).toHaveBeenCalledTimes(1);
  });

  it('should verify the phone after clicking the button "done"', () => {
    spyOn(component, 'verifPhone');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.verifPhone).toBeTruthy();
    const form = fixture.debugElement.nativeElement.querySelector('#inscriptionForm');
    const formPhoneElement: HTMLInputElement = fixture.debugElement.query(By.css('#phone')).nativeElement;
    formPhoneElement.value = '0782235996';
    expect(component.phone).toBeDefined();
  });

  it('should verify the age after clicking the button "done"', () => {
    spyOn(component, 'verifAge');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.verifAge).toBeTruthy();
  });

  it('should verify the mail after clicking the button "done"', () => {
    spyOn(component, 'verifMail');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.verifMail).toBeTruthy();
    
  });

  it('should verify the password after clicking the button "done"', () => {
    spyOn(component, 'verifMdp');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.verifMdp).toBeTruthy();
  });
  
  it('should be called once', () => {
    spyOn(component, 'addNewUser');
    spyOn(component, 'navigateTo');
    const route = component.navigateTo('/');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.navigateTo).toHaveBeenCalledTimes(1);
  });
  
  describe("Veuillez remplir tous les champs obligatoires ! ", function(){
    beforeEach(() => {
      if((expect(component.verifAge).toBeFalsy) || (expect(component.verifMail).toBeFalsy) ||(expect(component.verifMdp).toBeFalsy) || (expect(component.verifPhone).toBeFalsy) ){
        jasmine.setDefaultSpyStrategy(and => and.returnValue("Veuillez remplir tous les champs obligatoires !"));
      }

    });

    it("returns the value Veuillez remplir tous les champs obligatoires !", function(){
      var spy = jasmine.createSpy();
  
      const click = fixture.debugElement.query(By.css('button')).nativeElement;
      click.click();
      if((expect(component.verifAge).toBeFalsy) || (expect(component.verifMail).toBeFalsy) ||(expect(component.verifMdp).toBeFalsy) || (expect(component.verifPhone).toBeFalsy) ){
        expect(spy()).toEqual("Veuillez remplir tous les champs obligatoires !");
      }
    })

  })


  describe("Votre inscription a été un succès !", function(){
    beforeEach(() => {
      jasmine.setDefaultSpyStrategy(and => and.returnValue("Votre inscription a été un succès !"));
    });

    it("returns the value Votre inscription a été un succès !",function(){
      var spys = jasmine.createSpy();
      const click = fixture.debugElement.query(By.css('button')).nativeElement;
      click.click();
      if((expect(component.verifAge).toBeTruthy) && (expect(component.verifMail).toBeTruthy) && (expect(component.verifMdp).toBeTruthy) && (expect(component.verifPhone).toBeTruthy) && (expect(component.isChecked).toBeTruthy)){
        expect(spys()).toEqual("Votre inscription a été un succès !");
      }
  
    })

  })

  describe("Veuillez accepter les conditions générales !", function(){
    beforeEach(()=>{
      jasmine.setDefaultSpyStrategy(and => and.returnValue("Veuillez accepter les conditions générales !"));
    })

    it("returns the value Veuillez accepter les conditions générales !", function(){
      var spy = jasmine.createSpy();
      const click = fixture.debugElement.query(By.css('button')).nativeElement;
      click.click();
      if((expect(component.isChecked).toBeFalsy)){
        expect(spy()).toEqual("Veuillez accepter les conditions générales !");
      }
    })

  })
});
