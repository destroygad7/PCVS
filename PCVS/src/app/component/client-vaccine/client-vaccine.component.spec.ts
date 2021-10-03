import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVaccineComponent } from './client-vaccine.component';

describe('ClientVaccineComponent', () => {
  let component: ClientVaccineComponent;
  let fixture: ComponentFixture<ClientVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientVaccineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
