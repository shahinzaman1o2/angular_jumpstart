//                  Observables
// Observables are powerful data types that allows us --> 
// to handle asynchronous data streams  &  to model a variety of types of events
// An observable can emit one or more values over time, and can also emit an error or a completion signal. 
// You can subscribe to an observable to receive these emitted values, 
// and we can also transform, filter, and combine observables to create more complex data streams.
//----------------- **** ------------ **** ----------- **** ------------ **** ----------- **** ----------- **** -----------
//             Use Cases of Observables
// Use Case - 1: Asynchronous data handling --> In this example, we can create an observable that fetches data from a remote 
// server asynchronously using the HttpClient service. We subscribe to the observable and update the UI with the fetched data.

// Use Case - 2: Data transformation -->  We can create an observable that performs operations  
// on the data, such as filtering, mapping, and sorting, before sending it to the UI.

// Use Case - 3: Event handling --> We can create an observable that listens to events on a  
// web page, such as a mouse click or a keyboard press, and performs an action based on the event.

// Use Case - 4: Reactive programming --> We can create an observable that responds to changes  
// in a data source, such as a form input field or a database, and updates the UI accordingly.
//---------------------------------------------------------------------------------------------------------------------
//             Advantages of Observables over Promises
// Advantage - 1: Observables are lazy --> Observables do not execute the code inside them until a subscription is made, 
// which means that they don't start fetching data until the subscribe() method is called. 
// This can be useful in scenarios where you want to delay fetching data until a certain condition is met, 
// or where you want to fetch data on demand.

// Advantage - 2: Observables support cancellation --> Unlike Promises, Observables can be canceled. 
// This means that you can stop the data stream at any time, which can help prevent memory leaks and improve performance.

// Advantage - 3: Observables can handle multiple events --> Observables emit multiple events over time, while Promises only emit a single value. 
// This makes Observables more suited for scenarios where you want to stream real-time data or handle multiple HTTP requests.

// Advantage - 4: Observables provide powerful operators 
// (which is discussed & implemented in the route [next route] - observable-with-operators) --> 
// Observables provide a wide range of operators that allow you to transform, filter, and manipulate data streams. 
// These operators can simplify complex data transformations and make it easier to work with asynchronous data streams.

import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, delay } from 'rxjs';
// import { catchError, map, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-observable-use-cases',
  templateUrl: './observable-use-cases.component.html',
  styleUrls: ['./observable-use-cases.component.css']
})
export class ObservableUseCasesComponent implements OnDestroy {
  isLoading = false;
  items: string[] = [];
  dataSubscription: Subscription | undefined;
  // dataSubscription: Subscription;
  //--> must have a value of type `Subscription` -- can't be `undefined` or null initially -- (can't be `undefined` or null  at runtime)
  // dataSubscription!: Subscription;     [non-null assertion operator `!`]
  //--> must have a value of type `Subscription` -- can be `undefined` or null initially -- (can't be `undefined` or null at runtime)
  // dataSubscription: Subscription | undefined;
  //--> can have a value of type `Subscription` -- can be `undefined` or null initially -- (can't be `undefined` or null at runtime)

  eventsStarted = false;
  events: string[] = [];
  eventSubscription: any;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  // Use Case - 1: Asynchronous data handling --> 
  // Advantage - 1: Observables are lazy ---

  fetchData(): void {
    this.isLoading = true;

    // Create an observable that fetches data from a remote server
    const data$: Observable<any[]> = new Observable((observer) => {
      // `new Observable` creates an instance of the `Observable` class, which is a constructor function for creating observable instances.
      //    When you create an observable using `new Observable`, you are essentially defining a blueprint for the observable, 
      //    which specifies how the observable should behave when it is subscribed to, and how it should emit values to its subscribers.
      //    Therefore, new Observable is called the Observable constructor because it constructs new observable instances based on the blueprint defined by the Observable class.

      // Send an HTTP request to fetch the data
      const subscription = this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos').pipe(
        delay(5000)
      ).subscribe({  // `subscription` is of type `Subscription` because it is assigned the result of calling `subscribe` method on an observable returned by the `http.get` method.
        next: (data) => { // we used next: (data) ==>  to extract the data from Subscription
          // Use Case - 2: Data transformation --> 
          const transformedData = data.map((item) => item.title);
          observer.next(transformedData);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
      // because of the new Observable constructor, we could create a dedicated variable `subscription` of type Subscription
      // using this subscription, we can implement the Advantage - 2: Observables support cancellation...

      // Advantage - 2: Observables support cancellation ---
      return () => {
        subscription.unsubscribe();
      };
    });

    // Subscribe to the observable to fetch the data and update the UI
    this.dataSubscription = data$.subscribe((data) => {
      this.isLoading = false;
      this.items = data;
    });

  }
  // Note: we used the Observable constructor -- new Observable((observer) => {}) -- to create an Observable that emits a stream of values, 
  //    and we use the observer to listen to those values and perform some action in response to them. 

  // note: the unsubscribe() method is available on the Subscription object   Subscription --> unsubscribe()
  //       the subscribe() method is available on the Observable object       Observable --> subscribe()

  // In simpler syntax of Observable instead of new `Observable()` constructor
  //    we can't implement the Advantage - 2: Observables support cancellation
  //    because here we can't use the Observable Subscription anywhere else in the data$ (Observable)
  //    which is needed to implement unsubscribe() from the Subscription of the data$ (Observable)
  //    for implementing the Advantage - 2: Observables support cancellation inside of the data$ Observable
  //----------------------------------------------------------------------------------------------------
  // fetchData(): void {
  //   this.isLoading = true;

  //   const data$: Observable<any[]> = this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos').pipe(
  //     delay(5000),
  //     map(data => data.map(item => item.title)),  // we used map(data ==>  ) to extract the data from the Observable
  //     tap(() => this.isLoading = false),
  //     catchError(error => {
  //       this.isLoading = false;
  //       return throwError(error);
  //     })
  //   );

  //   this.dataSubscription = data$.subscribe({
  //     next: (data) => { // we used next: (data) ==>  to extract the data from the Subscription
  //       this.items = data;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });

  //   // or instead of above snippet, we could use --> 

  //   // this.dataSubscription = data$.subscribe((data) => {
  //   //   this.isLoading = false;
  //   //   this.items = data;
  //   // });

  // }

  // cancellation from the UI to visually relate to the Advantage - 2: Observables support cancellation
  cancelRequest(): void {
    // Cancel the data stream if it's currently running
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      this.isLoading = false;
    }
  }

  // Use Case - 3 & 4: Event handling & Reactive programming --> 
  // Advantage - 3: Observables can handle multiple events ---

  startEvents() {
    const event$: Observable<number> = new Observable((observer) => {
      let count = 0;
      const intervalId = setInterval(() => {
        // `setInterval` is a built-in JavaScript function that executes a specified function repeatedly after a specified time interval.
        observer.next(count); // emit an event with a value
        count++;
      }, 1000);

      return () => {
        clearInterval(intervalId); // clean up after the Observable completes
      };
    });
    // This cleanup function is called automatically by the Observable when the observer unsubscribes or when the Observable completes.

    this.eventSubscription = event$.subscribe((event) => {
      this.events.push(`Event ${event}`); // add the event to the list of events
    });

    this.eventsStarted = true;
  }
  // Note: we used the Observable constructor -- new Observable((observer) => {}) -- to create an Observable that emits a stream of values, 
  //    and we use the observer to listen to those values and perform some action in response to them. 

  stopEvents() {
    this.eventSubscription.unsubscribe(); // cancel the eventSubscription to stop the events
    this.eventsStarted = false;
  }

  // It's a good practice to implement ngOnDestroy lifecycle method at last of the component, it'll give us the flexibility 
  // to in the code in time of further implement & improvements of the Component. It also can be beneficial to find the method in time of coding the Component.
  // Because we did the unsubscribe inside of the Observable, it's not necessary to implement unsubscribe in the ngOnDestroy (executes on the component destroy)
  // It's also a good practice to to implement unsubscribe in the ngOnDestroy to Clean up any remaining subscriptions to prevent memory leaks
  ngOnDestroy(): void {
    // Clean up any remaining subscriptions to prevent memory leaks
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}
