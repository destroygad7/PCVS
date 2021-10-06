import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppointmentAppointComponent } from './admin-appointment-appoint.component';

describe('AdminAppointmentAppointComponent', () => {
  let component: AdminAppointmentAppointComponent;
  let fixture: ComponentFixture<AdminAppointmentAppointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAppointmentAppointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppointmentAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
