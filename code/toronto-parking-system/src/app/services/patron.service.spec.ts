import { TestBed } from '@angular/core/testing';

import { PatronService } from './patron.service';

describe('PatronService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatronService = TestBed.get(PatronService);
    expect(service).toBeTruthy();
  });
});
