import { TestBed } from '@angular/core/testing';

import { DirectiveHttpClientService } from './directive-http-client.service';

describe('DirectiveHttpClientService', () => {
  let service: DirectiveHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectiveHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
