import { TestBed } from '@angular/core/testing';

import { ChangestateService } from './changestate.service';

describe('ChangestateService', () => {
  let service: ChangestateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangestateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
