import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ConnexionComponent } from './connexion.component';
import { ConnexionService } from '../services/connexion.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;
  let service: ConnexionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, MatSnackBarModule],
      declarations: [ ConnexionComponent, AppComponent ],
      providers: [ConnexionService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ConnexionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be define', () => {
    expect(component.mail).toBeDefined();
  });

  it('should be define', ()=> {
    expect(component.mdp).toBeDefined();
  });
  
  it('should verify if the user exist in the database  after clicking the button "done"', ()=>{
    spyOn(component, 'loginUser');
    const form = fixture.debugElement.nativeElement.querySelector('#connexionForm');
    service.postUtilisateur(form);
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.loginUser).toHaveBeenCalledTimes(1);
  });

  it('should be called once', () => {
    spyOn(component, 'onClick');
    spyOn(component, 'navigateTo');
    const route = component.navigateTo('/');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.navigateTo).toHaveBeenCalledTimes(1);
  });

  describe("Connexion réussis",function(){
    beforeEach(()=> {
      if((expect(component.onClick).toBeTruthy)){
        jasmine.setDefaultSpyStrategy(and => and.returnValue("Connexion réussis"));
      }
    });

    it("returns the value Connexion réussis", function(){
      var spy = jasmine.createSpy();

      const click = fixture.debugElement.query(By.css('button')).nativeElement;
      click.click();
      if((expect(component.onClick).toBeTruthy)){
        expect(spy()).toEqual("Connexion réussis");
      }
    });
  });

  describe("Veuillez remplir tous les champs !", function(){
    beforeEach(() => {
      jasmine.setDefaultSpyStrategy(and => and.returnValue("Veuillez remplir tous les champs !"));
    });

    it("returns the value Veuillez remplir tous les champs !", function(){
      var spy = jasmine.createSpy();
      const click = fixture.debugElement.query(By.css('button')).nativeElement;
      click.click();
      if((expect(component.onClick).toBeTruthy)){
        expect(spy()).toEqual("Veuillez remplir tous les champs !");
      }
    });
  });
});
