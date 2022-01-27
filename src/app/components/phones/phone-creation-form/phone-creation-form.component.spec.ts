import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCreationFormComponent } from './phone-creation-form.component';

describe('PhoneCreationFormComponent', () => {
  let component: PhoneCreationFormComponent;
  let fixture: ComponentFixture<PhoneCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneCreationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
