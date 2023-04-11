import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMedicalCasesComponent } from './insert-medical-cases.component';

describe('HomeComponent', () => {
  let component: InsertMedicalCasesComponent;
  let fixture: ComponentFixture<InsertMedicalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertMedicalCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertMedicalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
