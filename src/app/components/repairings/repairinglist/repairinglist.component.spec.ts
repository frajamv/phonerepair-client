import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairinglistComponent } from './repairinglist.component';

describe('RepairinglistComponent', () => {
  let component: RepairinglistComponent;
  let fixture: ComponentFixture<RepairinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairinglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
