import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveReportComponent } from './recieve-report.component';

describe('RecieveReportComponent', () => {
  let component: RecieveReportComponent;
  let fixture: ComponentFixture<RecieveReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieveReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
