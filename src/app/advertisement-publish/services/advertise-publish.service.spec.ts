import { TestBed } from '@angular/core/testing';

import { AdvertisePublishService } from './advertise-publish.service';

describe('AdvertisePublishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvertisePublishService = TestBed.get(AdvertisePublishService);
    expect(service).toBeTruthy();
  });
});
