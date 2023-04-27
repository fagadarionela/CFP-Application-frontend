import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiseaseModalComponent } from './add-disease-modal.component';

describe('AddDiseaseModalComponent', () => {
  let component: AddDiseaseModalComponent;
  let fixture: ComponentFixture<AddDiseaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiseaseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDiseaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
