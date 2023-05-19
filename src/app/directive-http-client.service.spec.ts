import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DirectiveHttpClientService } from './directive-http-client.service';

describe('DirectiveHttpClientService', () => {
  let service: DirectiveHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule
    });
    service = TestBed.inject(DirectiveHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
