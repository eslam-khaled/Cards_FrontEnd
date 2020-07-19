import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrintRequestComponent } from './create-print-request.component';

describe('CreatePrintRequestComponent', () => {
  let component: CreatePrintRequestComponent;
  let fixture: ComponentFixture<CreatePrintRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePrintRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrintRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
