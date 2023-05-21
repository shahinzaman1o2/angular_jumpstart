import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchJsonPipe } from '../fetch-json.pipe';
// import { CustomPipeComponent } from './custom-pipe.component';

describe('FetchJsonPipe', () => {
  let pipe: FetchJsonPipe;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // declarations: [CustomPipeComponent],  --> this is ignorable
      // declarations: [FetchJsonPipe],  --> this is ignorable
      imports: [HttpClientTestingModule],
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
    expect(req.request.method).toBe('GET');

    req.flush(responseData);

    expect(pipe['cachedData']).toEqual(responseData);
  });
});
