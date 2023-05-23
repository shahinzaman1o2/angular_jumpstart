import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DirectiveHttpClientService } from './directive-http-client.service';
// import { User } from './user.model';

describe('DirectiveHttpClientService', () => {
  let service: DirectiveHttpClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DirectiveHttpClientService]
    });
    service = TestBed.inject(DirectiveHttpClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    // `httpMock.verify()`is used to ensure that all expected HTTP requests have been handled and that there are no outstanding or unexpected requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from the API', () => {
    // const mockUsers: User[] = [
    const mockUsers = [
      { id: 1, name: 'John', username: 'john01', email: 'john@example.com' },
      { id: 2, name: 'Jane', username: 'jane02', email: 'jane@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    // Mocking is commonly used in unit testing to replace real dependencies with fake or controlled implementations to isolate the unit under test.

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
