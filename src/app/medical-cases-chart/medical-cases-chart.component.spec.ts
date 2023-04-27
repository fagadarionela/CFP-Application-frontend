import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCasesChartComponent } from './medical-cases-chart.component';

describe('MedicalCasesChartComponent', () => {
  let component: MedicalCasesChartComponent;
  let fixture: ComponentFixture<MedicalCasesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalCasesChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalCasesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
