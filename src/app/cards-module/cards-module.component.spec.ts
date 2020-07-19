import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsModuleComponent } from './cards-module.component';

describe('CardsModuleComponent', () => {
  let component: CardsModuleComponent;
  let fixture: ComponentFixture<CardsModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
