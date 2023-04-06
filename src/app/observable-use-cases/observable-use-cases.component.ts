// Asynchronous data handling: In this example, we can create an observable that fetches data from a remote server asynchronously using the HttpClient service.
// We subscribe to the observable and update the UI with the fetched data.

// Event handling: We can create an observable that listens to events on a web page, such as a mouse click or a keyboard press, and performs an action based on the event.
// In this example, we create an observable that listens to keyup events on an input field and updates a variable with the last pressed key.

// Reactive programming: We can create an observable that responds to changes in a data source, such as a form input field or a database, and updates the UI accordingly.
// In this example, we create an observable that responds to changes in the input field and updates the UI with the last pressed key.

// Data transformation: We can create an observable that performs operations on the data, such as filtering, mapping, and sorting, before sending it to the UI.
// In this example, we perform a map operation on the fetched data to extract the "title" property before updating the UI.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-observable-use-cases',
  template: `
    <h1>Observable Demo</h1>
    <button (click)="fetchData()">Fetch Data</button>
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
    <input type="text" #input (keyup)="search(input.value)" />
    <p>Last key pressed: {{ lastKeyPressed }}</p>
    <br><br>
    <a routerLink="/observable-with-operators">observable-with-operators</a>
  `,
  styleUrls: ['./observable-use-cases.component.css']
})
export class ObservableUseCasesComponent implements OnInit, OnDestroy {
  items: string[] = [];
  lastKeyPressed: string = '';
  dataSubscription!: Subscription;
  searchSubscription!: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  // Asynchronous data handling: 
  // We can create an observable that fetches data from a remote server asynchronously using the HttpClient service.
  fetchData() {
    const data$: Observable<any[]> = this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos');
    this.dataSubscription = data$.subscribe((data) => {
      // Data transformation: 
      // We can create an observable that performs operations on the data, such as filtering, mapping, and sorting, before sending it to the UI.
      this.items = data.map((item) => item.title);
    });
  }

  // Event handling and Reactive programming: 
  // We can create an observable that listens to events on a web page, such as a mouse click or a keyboard press, and performs an action based on the event.
  search(query: string) {
    // Create an observable that listens to keyup events on the input field
    const search$: Observable<string> = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
      debounceTime(300), // debounce to limit the number of API calls
      map((event) => (event.target as HTMLInputElement).value),
      filter((text) => text.length >= 3), // filter to ignore short queries
      distinctUntilChanged() // filter to ignore duplicate queries
    );
    // Subscribe to the search observable to update the lastKeyPressed property
    // and potentially make an API call based on the query
    this.searchSubscription = search$.subscribe((text) => {
      this.lastKeyPressed = text;
      // Make API call here based on the query
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
