import { TestBed } from '@angular/core/testing';

import { PhonerepairingService } from './phonerepairing.service';

describe('PhonerepairingService', () => {
  let service: PhonerepairingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhonerepairingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
