import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMedicalCasesComponent } from './review-medical-cases.component';

describe('HomeComponent', () => {
  let component: ReviewMedicalCasesComponent;
  let fixture: ComponentFixture<ReviewMedicalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewMedicalCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewMedicalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
