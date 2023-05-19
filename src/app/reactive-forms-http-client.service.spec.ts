import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReactiveFormsHttpClientService } from './reactive-forms-http-client.service';

describe('ReactiveFormsHttpClientService', () => {
  let service: ReactiveFormsHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add the HttpClientTestingModule
    });
    service = TestBed.inject(ReactiveFormsHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
