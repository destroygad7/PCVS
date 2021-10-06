import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBatchInfoComponent } from './admin-batch-info.component';

describe('AdminBatchInfoComponent', () => {
  let component: AdminBatchInfoComponent;
  let fixture: ComponentFixture<AdminBatchInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBatchInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBatchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
