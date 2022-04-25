import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PageDAccueilComponent } from './page-d-accueil.component';

describe('PageDAccueilComponent', () => {
  let component: PageDAccueilComponent;
  let fixture: ComponentFixture<PageDAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ PageDAccueilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called once', () => {
    spyOn(component, 'navigateTo');
    const route = component.navigateTo('/connexion');
    const click = fixture.debugElement.query(By.css('button')).nativeElement;
    click.click();
    expect(component.navigateTo).toHaveBeenCalledTimes(2);
  })

});