import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReactiveFormsHttpClientService } from './reactive-forms-http-client.service';
import { User } from './user.model';

describe('ReactiveFormsHttpClientService', () => {
  let service: ReactiveFormsHttpClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add the HttpClientTestingModule
      providers: [ReactiveFormsHttpClientService]
    });
    service = TestBed.inject(ReactiveFormsHttpClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'John', username: 'john123', email: 'john@example.com' },
      { id: 2, name: 'Jane', username: 'jane456', email: 'jane@example.com' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
