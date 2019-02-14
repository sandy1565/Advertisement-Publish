import { TestBed } from '@angular/core/testing';

import { AdvtDetailsService } from './advt-details.service';

describe('AdvtDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvtDetailsService = TestBed.get(AdvtDetailsService);
    expect(service).toBeTruthy();
  });
});
