import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteMedicalCasesComponent } from './complete-medical-cases.component';

describe('HomeComponent', () => {
  let component: CompleteMedicalCasesComponent;
  let fixture: ComponentFixture<CompleteMedicalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteMedicalCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteMedicalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
