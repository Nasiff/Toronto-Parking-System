import { TestBed } from '@angular/core/testing';

import { EnforcerService } from './enforcer.service';

describe('EnforcerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnforcerService = TestBed.get(EnforcerService);
    expect(service).toBeTruthy();
  });
});
