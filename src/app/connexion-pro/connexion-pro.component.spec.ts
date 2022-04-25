import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { ConnexionProComponent } from './connexion-pro.component';

describe('ConnexionProComponent', () => {
  let component: ConnexionProComponent;
  let fixture: ComponentFixture<ConnexionProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
	 imports: [RouterTestingModule, FormsModule, MatSnackBarModule, HttpClientTestingModule],
      declarations: [ ConnexionProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be define', () => {
    expect(component.mail).toBeDefined();
  })
  
  it('should be define', ()=> {
    expect(component.mdp).toBeDefined();
  })

  it('should be called once', () => {
    spyOn(component, 'onClick');
    spyOn(component, 'navigateTo');
    const route = component.navigateTo('/');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.navigateTo).toHaveBeenCalledTimes(1);
  })

  it('should be called once', ()=>{
    spyOn(component, 'onClick');
    spyOn(component, 'openSnackBar');
    spyOn(component, 'navigateTo');
    const route = component.navigateTo('/calendrier');
    const message = component.openSnackBar('Connexion réussis !', 'done');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.openSnackBar).toHaveBeenCalledTimes(1);
  })


});
