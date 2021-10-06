import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClietCentreComponent } from './cliet-centre.component';

describe('ClietCentreComponent', () => {
  let component: ClietCentreComponent;
  let fixture: ComponentFixture<ClietCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClietCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClietCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
