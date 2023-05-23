import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReactiveFormsHttpClientService } from './reactive-forms-http-client.service';
// import { User } from './user.model';

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
    // const mockUsers: User[] = [
    const mockUsers = [
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

  // it('should retrieve users', () => {
  //   // const mockUsers: User[] = [
  //   const mockUsers = [
  //     { id: 1, name: 'John', username: 'john123', email: 'john@example.com' },
  //     { id: 2, name: 'Jane', username: 'jane456', email: 'jane@example.com' }
  //   ];

  //   const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockUsers);

  //   service.getUsers().subscribe(users => {
  //     expect(users.length).toBe(2);
  //     expect(users).toEqual(mockUsers);
  //   });
  // });

  //---------------------------------------
  // In the first code snippet, the service.getUsers().subscribe() block is executed first. This sets up the subscription to the getUsers method 
  // and defines the expectations for the returned users. Then, the expectOne function is called to set up the expectation for the HTTP request. 
  // Finally, the req.flush() method is used to simulate the HTTP response and fulfill the expectation set by expectOne. 
  // This order ensures that the expectations are set up before the HTTP request is triggered, allowing the test to accurately check the behavior.

  // However, in the second code snippet, the order of operations is reversed. The expectOne function is called before the subscription 
  // to service.getUsers() is set up. This means that the HTTP request expectation is set before the actual request is triggered.
});
