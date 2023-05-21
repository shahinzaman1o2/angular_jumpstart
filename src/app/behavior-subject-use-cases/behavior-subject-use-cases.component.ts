// BehaviorSubject is a type of Subject that always emits the most recent value to new subscribers. 
// It stores the current value of the observable sequence, which can be accessed using the .value property.
// It emits the current value immediately to new subscribers when they subscribe, before emitting any subsequent values.
// BehaviorSubject can be useful in situations where you need to share state between different parts of your application,
// and ensure that all subscribers receive the current state when they first subscribe, without having to wait for new values to be emitted.
// However, it's important to note that the use of BehaviorSubject should be carefully considered, as it can potentially lead to unexpected behavior if used incorrectly.

// Does BehaviorSubject store data?
// Yes, BehaviorSubject stores the most recently emitted value and new subscribers will receive that value immediately upon subscription. 
// In other words, BehaviorSubject has a concept of "current value" that is accessible through the value property, 
// and this value is updated whenever a new value is emitted by calling the next() method. 
// This makes BehaviorSubject a useful tool for sharing state across components in an Angular application.

// does Observable store data?
// No, an Observable does not store data. It is simply a stream of data that can be subscribed to. When an Observable is created, it is just 
// a blueprint for a stream of data. The actual data is produced by the source of the Observable, such as a user event or an HTTP request. 
// Once the data is produced, it is emitted to all subscribers of the Observable, but it is not stored within the Observable itself.

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
  templateUrl: './behavior-subject-use-cases.component.html',
  styleUrls: ['./behavior-subject-use-cases.component.css']
})
export class BehaviorSubjectUseCasesComponent implements OnDestroy {
  // Use Case 1: Sharing state across components
  message!: string;

  // Use Case 2: Caching
  public cachedDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public cachedData$: Observable<any>;
  private cachedDataSubscription!: Subscription;

  // Use Case 4: User Input
  public inputSubject = new BehaviorSubject<string>('');
  private inputSubscription: Subscription;
  inputValue = '';

  // Use Case 5: Real-time Updates
  public messagesSubject = new BehaviorSubject<string[]>([]);
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
