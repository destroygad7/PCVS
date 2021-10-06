import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBatchInfoComponent } from './client-batch-info.component';

describe('ClientBatchInfoComponent', () => {
  let component: ClientBatchInfoComponent;
  let fixture: ComponentFixture<ClientBatchInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBatchInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBatchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
