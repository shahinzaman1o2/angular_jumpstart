// Does BehaviorSubject store data?
// Yes, BehaviorSubject stores the most recently emitted value and new subscribers will receive that value immediately upon subscription. 
// In other words, BehaviorSubject has a concept of "current value" that is accessible through the value property, 
// and this value is updated whenever a new value is emitted by calling the next() method. 
// This makes BehaviorSubject a useful tool for sharing state across components in an Angular application.

// does Observable store data?
// No, an Observable does not store data. It is simply a stream of data that can be subscribed to. When an Observable is created, it is just 
// a blueprint for a stream of data. The actual data is produced by the source of the Observable, such as a user event or an HTTP request. 
// Once the data is produced, it is emitted to all subscribers of the Observable, but it is not stored within the Observable itself.

// BehaviorSubject is a type of Subject that always emits the most recent value to new subscribers. 
// It stores the current value of the observable sequence, which can be accessed using the .value property.
// It emits the current value immediately to new subscribers when they subscribe, before emitting any subsequent values.
// BehaviorSubject can be useful in situations where you need to share state between different parts of your application,
// and ensure that all subscribers receive the current state when they first subscribe, without having to wait for new values to be emitted.
// However, it's important to note that the use of BehaviorSubject should be carefully considered, as it can potentially lead to unexpected behavior if used incorrectly.

import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChangestateService } from '../changestate.service';
import { AuthService } from '../auth.service';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-behavior-subject-use-cases',
  template: `
    <h2 style="margin-bottom: 40px;">BehaviorSubject Use Cases</h2>

    <!-- Use Case 1: Sharing state across components -->
    <h3  style="color: crimson">Sharing state across components --> </h3>
    <input type="text" [(ngModel)]="message">
    <button (click)="shareState()">Share State to Child</button><br><br>
    <app-child-behavior-subject-use-case-one></app-child-behavior-subject-use-case-one>
    <br><br>
    <!-- This **[Use Case 1]** is mostly used in e-commerce app. For example: we can think of Shared State to Child button as add to card button of the product 
    and the shared state as shopping basket🧺 of the shopping cart. Now we can think of how the Shared State is changing is like the number of state changing 
    from 0 to 1-2-3... of the shopping basket🧺 of the shopping cart. So, in the e-commerce app we can think of we're sharing the state of 
    HomeComponent(holds the product-elements)/parentComponent to the cartComponent(holds the basket-element)/childComponentlike how 
    we're sharing the state of BehaviorSubjectUseCasesComponent to the ChildBehaviorsubjectComponent. -->

    <!-- Use Case 2: Caching -->
    <!-- When the application starts, the cached data is null. -->
    <!-- When the component needs to fetch data, it first checks if there is cached data available in the BehaviorSubject. 
    If there is cached data, it retrieves the data from the BehaviorSubject and returns it without making an API call. -->
    <!-- If there is no cached data available, the component makes an API call to fetch the data. -->
    <!-- When the API call returns, the component stores the data in the BehaviorSubject using the next() method. -->
    <!-- Any component that subscribes to the BehaviorSubject receives the cached data emitted by the BehaviorSubject. -->
    <!-- By using BehaviorSubject as a cache, we can avoid making unnecessary API calls, resulting in faster and more efficient performance. -->
    <h3 style="color: crimson">Caching --> </h3>
    <button (click)="fetchData()">Fetch Data</button>
    <button (click)="getCachedData()">Get Cached Data in the console</button>
    <p>Data: {{ cachedData$ | async | json }}</p>
    <p *ngIf="(cachedData$ | async)?.length === 0">No data available</p>
    <div style="border: 1px solid crimson;">
      <app-child-behavior-subject-use-case-two *ngIf="(cachedData$ | async)?.length > 0" [products]="cachedData$ | async"></app-child-behavior-subject-use-case-two>
      <!-- property binding syntax [propertyName]="propertyValue" -->
    </div>
    <br><br>

    <!-- Use Case 3: Event Bus -->
    <!-- Event Bus is a mechanism for components to communicate with each other through a centralized event system.
    [In this case the centralized event system is our AuthService and the event bus is the BehaviorSubject's instance inside of the AuthService] 
    When a component wants to communicate with another component, it emits an event through the Event Bus, 
    and any component that is subscribed to that event can receive the data. -->
    <h3 style="color: crimson">Event Bus --> </h3>
    <button (click)="login()">Log In</button>
    <br><br>
    <div style="border: 1px solid crimson;">
      <app-child-behavior-subject-use-case-three></app-child-behavior-subject-use-case-three>
    </div>
    <br><br>

    <!-- Use Case 4: User Input -->
    <h3 style="color: crimson">User Input --> </h3>
    <input type="text" #input1 (input)="updateInput(input1.value)">
    <h3>Input: {{inputValue}}</h3>
    <br>

    <!-- Use Case 5: Real-time Updates -->
    <h3 style="color: crimson">Real-time Updates --> </h3>
    <h3>Chat Room: </h3>
    <ul>
      <li *ngFor="let message of messages$ | async">{{message}}</li>
    </ul>
    <input type="text" #input2 (input)="sendMessage(input2.value)">
    <br><br><br><br>

    <a routerLink="/directive-http-client" style="font-weight: bold; font-size: larger;">directive-http-client</a>
  `,
  styleUrls: ['./behavior-subject-use-cases.component.css']
})
export class BehaviorSubjectUseCasesComponent implements OnDestroy {
  // Use Case 1: Sharing state across components
  message!: string;

  // Use Case 2: Caching
  private cachedDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public cachedData$: Observable<any>;
  private cachedDataSubscription!: Subscription;

  // Use Case 4: User Input
  private inputSubject = new BehaviorSubject<string>('');
  private inputSubscription: Subscription;
  inputValue = '';

  // Use Case 5: Real-time Updates
  private messagesSubject = new BehaviorSubject<string[]>([]);
  private messagesSubscription: Subscription;
  messages$: Observable<string[]>;

  constructor(
    private http: HttpClient,
    private stateService: ChangestateService,
    private authService: AuthService
  ) {
    // Use Case 2: Caching
    this.cachedData$ = this.cachedDataSubject.asObservable();
    // The asObservable() method is a utility method provided by RxJS that allows you to create a read-only version (Observable) of a BehaviorSubject.
    // The read-only Observable can be subscribed to, but it cannot emit new values to the stream directly.
    // Instead, new values must be emitted by the private Subject or BehaviorSubject that is being observed. 
    // This helps to ensure that all updates to the state are performed through a single source of truth and prevent unwanted state changes from external sources.

    // Use Case 4: User Input
    this.inputSubscription = this.inputSubject.subscribe(input => {
      this.inputValue = input;
    });

    // Use Case 5: Real-time Updates
    this.messages$ = this.messagesSubject.asObservable();
    this.messagesSubscription = this.getMessages().subscribe(message => {
      const messages = this.messagesSubject.getValue();
      messages.push(message);
      this.messagesSubject.next(messages);
    });
  }

  // Use Case 1: Sharing state across components --> 
  shareState() {
    this.stateService.changeState(this.message);
  }

  // Use Case 2: Caching --> 
  fetchData(): void {
    // Make a GET request to the API endpoint to fetch data
    this.cachedDataSubscription = this.http.get<Product[]>('https://fakestoreapi.com/products?limit=3').subscribe(response => {
      this.cachedDataSubject.next(response);
    });
  }

  getCachedData(): void {
    // Display the cached data
    console.log(this.cachedDataSubject.getValue());
  }

  // Use Case 3: Event Bus --> 
  login() {
    // Perform login logic
    // ...

    // Update login status
    this.authService.setLoginStatus(true);
  }

  // Use Case 4: User Input --> 
  updateInput(value: string): void {
    this.inputSubject.next(value);
  }

  // Use Case 5: Real-time Updates --> 
  getMessages(): Observable<string> {
    // Simulate real-time updates
    return new Observable(observer => {
      setTimeout(() => {
        observer.next('Hello');
      }, 1000);
      setTimeout(() => {
        observer.next('How are you?');
      }, 2000);
      setTimeout(() => {
        observer.next('I am fine, thanks');
      }, 3000);
      setTimeout(() => {
        observer.next('What about you?');
      }, 4000);
      setTimeout(() => {
        observer.next('Same here');
      }, 5000);
    });
  }

  sendMessage(message: string): void {
    const messages = this.messagesSubject.getValue();
    messages.push(message);
    this.messagesSubject.next(messages);
  }

  // best practice to check the subscription to avoid runtime errors (because there can be no subscription).
  // it's a good approach to place the `ngOnDestroy` method at the end of the component-class
  // This can help make it easier to find the method when working with larger and more complex components.
  // This can also help the method to being strict to it's position when updating the code with new Subscription additions.

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.cachedDataSubscription) {
      this.cachedDataSubscription.unsubscribe();
    }
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

}
