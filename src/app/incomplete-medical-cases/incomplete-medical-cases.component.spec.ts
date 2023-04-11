import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteMedicalCasesComponent } from './incomplete-medical-cases.component';

describe('HomeComponent', () => {
  let component: IncompleteMedicalCasesComponent;
  let fixture: ComponentFixture<IncompleteMedicalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteMedicalCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteMedicalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
