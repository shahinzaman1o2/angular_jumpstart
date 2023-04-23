//                                    **** Operators from RxJS ****

// ----------------- Creation Operators ----------------------------

// of --> It is used to create an observable sequence that emits a fixed set of values. 
//        It can take any number of arguments, and each argument is emitted in sequence by the resulting observable.

// from --> It creates an observable sequence from an array, an array-like object, a Promise, an iterable, or an Observable-like object.

// interval --> It creates an Observable that emits sequential integers at a specified interval of time. 
//              It takes a parameter that specifies the time interval (in milliseconds) between each emission. 
//              The first value emitted is 0, the next value is 1, then 2, and so on. The emissions continue indefinitely until unsubscribed.

// fromEvent --> It allows creating an observable from a DOM event or Node.js EventEmitter. 
//               It takes two parameters - the source object (either a DOM element or an EventEmitter), and the name of the event to listen for. 
//               It emits the event object whenever the specified event occurs.

// ----------------- Transformation Operators ------------------------

// map --> Transforms each value emitted by the source observable into a new value.

// switchMap --> It creates a new inner Observable (by dynamically switching to a new observable based on the emission of 
//               the source observable) then it maps (to transform) each value emitted by the source observable to a new observable, 
//               and then subscribes to that new observable.
//               ***---> It then emits the values produced by the recently subscribed observable (newly created inner observable), 
//               ignoring any previous observables that may still be emitting values <---***. 
//               The emitted values of the new observable are then passed through the rest of the operator pipeline.

// filter --> It creates a new Observable that emits only the values from the source Observable that pass a provided condition. 
//            It takes a predicate function as an argument and applies it to each value emitted by the source Observable. 
//            If the predicate function returns true, the value is emitted by the new Observable, and if it returns false, the value is ignored.

// tap --> It allows you to perform a side effect on each emission of the source observable, without modifying the emitted values.
//         The tap operator takes as its argument a function that is called for each emitted value of the source observable. 
//         This function can be used to perform any kind of side effect, such as logging, modifying external state, or triggering other side effects.

// ----------------- Combination Operators ----------------------------

// merge --> It combines multiple Observables into a single Observable that emits all the values from all the input Observables in any order.
//           When any of the input Observables emit a value, the merge operator immediately forwards the value to the output Observable.
//           This allows you to merge streams of data from multiple sources into a single stream, which can be useful in many scenarios 
//           such as combining user input with server responses or combining data from multiple sensors in a real-time application.

// take --> It combines the source Observable with another Observable to limit the number of emissions from the source Observable.
//          take is used to limit the number of emissions from an Observable stream, effectively taking a "snapshot" of the first n values 
//          that are emitted, and then completing. It is commonly used with interval and timer Observables to limit the number of times they emit values.


//                              **** Utility methods from RxJS ****

// ------------------------------------ next() -----------------------------------------

// It allows us to emit values from Observables to observers, enabling us to create powerful and flexible streams of data.

// Manually emit values from outside or emit values from inside of an observable ---->

// We manually emit values by calling a method like `next()` outside of an observable context
//    note: next() method is used by the observer to emit values to the observable's subscriber
//    example: `data$` & `event$` Observables which are used in ObservableUseCasesComponent
// Observables emit values on their own, and we can use operators to transform or modify the emitted values.
//    note: Observables emit values on their own, without the use of operators. 
//    example: `items$` Observable which is used in this component.

// ---------------------------------- pipe() method -------------------------------------

// pipe --> pipe() is a method in RxJS that allows you to combine multiple pipeable operators into a single, composable transformation function. 
//          It takes a sequence of operators as arguments, and returns a new function that applies those operators in sequence to an Observable. 
//          The resulting function can be used in place of the original Observable, and any subscriptions to it will receive the transformed data stream.

// pipeable operators ---->

// map, filter, tap, take, switchMap, mergeMap, concatMap, scan, reduce, and many others

// pipeable operators are functions that can be composed together in a chain to form a pipeline that transforms the stream 
// of data emitted by an Observable. They take an Observable as input and return a new Observable with the modified data stream.

// advantages over older, chained syntax for applying operators -->
// They are more composable and easier to read and maintain.
// They allow for better performance optimization, as they can apply multiple operators at once without creating intermediate Observables.
// They are tree-shakable, meaning that unused operators can be eliminated during the build process, reducing the size of the resulting bundle.

// ------------------------------ asObservable() method ------------------------------------

// It's discussed in the `BehaviorSubjectUseCasesComponent` --> Use Case 2: Caching

//-------- *** -------- **** -------- **** --------- **** --------- **** -------- **** -------- **** ------- **** -------- **** -------- **** -------

import { Component, OnInit } from '@angular/core';
import { Observable, interval, of, from, fromEvent, merge } from 'rxjs';
import { map, filter, take, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-observable-with-operators',
  template: `
    <h1>{{ title }}</h1>
    <!-- Subscribe to the greeting$ Observable and display the result -->
    <h3 style="color: crimson">{{ greeting$ | async }}</h3>
      
    <!-- Subscribe to the items$ Observable and display the results in a list -->
    <ul>
      <li *ngFor="let item of items$ | async">{{ item.name }} - {{ item.description }}</li>
    </ul>
    
    <h3 style="margin-top: 35px;">Type in the input field - UI will show you the Last Key Pressed:</h3>
    <!-- Display the last key pressed -->
    <p>Last key pressed: {{ lastKeyPressed }}</p>

    <!-- Press any key to update the last key pressed -->
    <input type="text" (keydown)="updateLastKeyPressed($event)" />
    <br><br>
    
    <h3>Click on the Button / click on outside of the Button of the UI(document) - Browser console will show you the Emitted event --> </h3>
    <h3>Button (click) will create a new Observable which will collect all the lastKeyPressed in the input field and will update the UI: </h3>
    <!-- A button to trigger the switchMap example -->
    <button id="myButton">Click me!</button>
    <br><br><br><br>

    <a routerLink="/behavior-subject-use-cases" style="font-weight: bold; font-size: larger;">behavior-subject-use-cases</a>
  `,
  styleUrls: ['./observable-with-operators.component.css']
})
export class ObservableWithOperatorsComponent implements OnInit {
  title = 'rxjs-operators';
  greeting$: Observable<string> = of('');

  items$: Observable<any[]> = of([]);

  lastKeyPressed!: string;

  ngOnInit(): void {
    // Create an Observable of a greeting string
    this.greeting$ = of('Hello, RxJS!').pipe(
      map(greeting => `${greeting} How are you today?`)
    );

    // Create an Observable that emits an array of items every second
    this.items$ = interval(1000).pipe(
      take(10),
      map(num => {
        const items = [];
        for (let i = 0; i <= num; i++) {
          items.push({
            name: `Item ${num}-${i}`,
            description: `This is item ${num}-${i}`
          });
        }
        return items;
      }),
      tap(items => console.log(`Emitted ${items.length} items`))
    );

    // Create an Observable from an array of numbers
    const numbers$ = from([1, 2, 3, 4, 5]);

    // Use the filter operator to create an Observable that emits only even numbers
    const evenNumbers$ = numbers$.pipe(
      filter(num => num % 2 === 0)
    );

    // Subscribe to the evenNumbers$ Observable and log the values
    evenNumbers$.subscribe(num => console.log(num));

    // Create an Observable from a click event on a button element
    const buttonClick$ = fromEvent(document.getElementById('myButton')!, 'click');  // non-null assertion operator `!`

    // Create an Observable from a mousemove event on the document
    const mouseMove$ = fromEvent(document, 'mousemove');

    // Use the merge operator to merge the buttonClick$ and mouseMove$ Observables
    merge(buttonClick$, mouseMove$).pipe(
      tap(event => console.log(`Merged event: ${event.type}`))
    ).subscribe();

    // Use the switchMap operator to create an Observable that emits the last key pressed
    buttonClick$.pipe(
      switchMap(() => fromEvent(document, 'keydown')),
      filter(event => event.target instanceof HTMLInputElement),
      map(event => (event.target as HTMLInputElement).value),
      tap(key => console.log(`Last key pressed: ${key}`))
    ).subscribe(key => this.lastKeyPressed = key);
  }

  updateLastKeyPressed(event: KeyboardEvent): void {
    this.lastKeyPressed = event.key;
  }

}
