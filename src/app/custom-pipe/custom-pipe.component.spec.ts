import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchJsonPipe } from '../fetch-json.pipe';
// import { CustomPipeComponent } from './custom-pipe.component';

describe('FetchJsonPipe', () => {
  let pipe: FetchJsonPipe;
  let httpMock: HttpTestingController;
  // HttpTestingController: This service is provided by --HttpClientTestingModule-- and allows you to intercept and handle HTTP requests. 
  // It provides methods like `expectOne()`, `expectNone()`, and `verify()` to manage the expected requests 
  // and verify that all expected requests have been handled. It allows you to define expectations for the requests, 
  // provide mock responses using req.flush(), and perform assertions on the requests.

  beforeEach(() => {
    TestBed.configureTestingModule({
      // declarations: [CustomPipeComponent],  --> this is ignorable
      // declarations: [FetchJsonPipe],  --> this is ignorable
      //---> these are ignoring and instead of --providers: [FetchJsonPipe],-- it's creating error cause the FetchJsonPipe is counting like Service.
      imports: [HttpClientTestingModule],
      // `HttpClientModule`, allowing you to work with a simulated HTTP environment during testing. 
      // It ensures that the HttpClient module and its dependencies are available for testing, and it provides the HttpTestingController service.
      providers: [FetchJsonPipe],
    });

    pipe = TestBed.inject(FetchJsonPipe);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should fetch JSON data from URL', () => {
    const url = 'assets/heroes.json';
    const responseData = [
      {
        name: 'Windstorm',
        canFly: true
      },
      {
        name: 'Bombasto',
        canFly: false
      }
    ];

    pipe.transform(url);

    const req = httpMock.expectOne(url);
    // `expectOne()` method is used to set an expectation for an HTTP request to the specified URL (url).
    expect(req.request.method).toBe('GET');
    // The returned `TestRequest object (req)` allows you to make assertions on the request properties.

    req.flush(responseData);
    // `req.flush()` method to provide a mock response for the expected request. 
    // This allows us to simulate the server's response and continue with further assertions or actions based on the response.

    expect(pipe['cachedData']).toEqual(responseData);
  });
});
