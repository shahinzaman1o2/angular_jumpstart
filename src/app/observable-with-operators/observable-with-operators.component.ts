import { Component, OnInit } from '@angular/core';
import { Observable, interval, of, from, fromEvent, merge } from 'rxjs';
import { map, filter, take, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-observable-with-operators',
  template: `
    <h1>{{ title }}</h1>
    <!-- Subscribe to the greeting$ Observable and display the result -->
    <h2>{{ greeting$ | async }}</h2>
      
    <!-- Subscribe to the items$ Observable and display the results in a list -->
    <ul>
      <li *ngFor="let item of items$ | async">{{ item.name }} - {{ item.description }}</li>
    </ul>
      
    <!-- Display the last key pressed -->
    <p>Last key pressed: {{ lastKeyPressed }}</p>

    <!-- Press any key to update the last key pressed -->
    <input type="text" (keydown)="updateLastKeyPressed($event)" />
      
    <!-- A button to trigger the switchMap example -->
    <button id="myButton">Click me!</button>
    <br><br>
    <a routerLink="/behavior-subject-use-cases">behavior-subject-use-cases</a>
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
        for (let i = 0; i < num + 1; i++) {
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
    const buttonClick$ = fromEvent(document.getElementById('myButton')!, 'click');

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
