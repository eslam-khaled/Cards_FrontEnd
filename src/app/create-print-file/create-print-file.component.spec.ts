import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrintFileComponent } from './create-print-file.component';

describe('ReportsComponent', () => {
  let component: CreatePrintFileComponent;
  let fixture: ComponentFixture<CreatePrintFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePrintFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrintFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
