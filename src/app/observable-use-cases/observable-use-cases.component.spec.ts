import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableUseCasesComponent } from './observable-use-cases.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ObservableUseCasesComponent', () => {
  let component: ObservableUseCasesComponent;
  let fixture: ComponentFixture<ObservableUseCasesComponent>;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ObservableUseCasesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ObservableUseCasesComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient); // Inject the httpClient here
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data and set items', fakeAsync(() => {
    const testData = [
      { title: 'Item 1' },
      { title: 'Item 2' },
      { title: 'Item 3' },
    ];

    spyOn(httpClient, 'get').and.returnValue(of(testData));

    component.fetchData();

    expect(component.isLoading).toBe(true);

    tick(5000); // Advance the virtual clock by the delay value

    expect(httpClient.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos'
    );

    expect(component.isLoading).toBe(false);
    expect(component.items).toEqual(['Item 1', 'Item 2', 'Item 3']);
  }));

  it('should cancel the request and reset isLoading', () => {
    component.dataSubscription = {
      unsubscribe: jasmine.createSpy('unsubscribe'),
    } as any;
    component.isLoading = true;

    component.cancelRequest();

    expect(component.dataSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should start events and add events to the list', fakeAsync(() => {
    component.startEvents();

    expect(component.eventsStarted).toBe(true);

    tick(1000);
    expect(component.events).toEqual(['Event 0']);

    tick(1000);
    expect(component.events).toEqual(['Event 0', 'Event 1']);

    component.stopEvents();
    expect(component.eventsStarted).toBe(false);
  }));

  it('should unsubscribe from dataSubscription on component destroy', () => {
    component.dataSubscription = {
      unsubscribe: jasmine.createSpy('unsubscribe'),
    } as any;

    component.ngOnDestroy();

    expect(component.dataSubscription.unsubscribe).toHaveBeenCalled();
  });
});
