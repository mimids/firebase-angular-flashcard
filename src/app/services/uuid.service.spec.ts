import { TestBed } from '@angular/core/testing';

import { UUidService } from './uuid.service';

describe('UUidService', () => {
  let service: UUidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UUidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
