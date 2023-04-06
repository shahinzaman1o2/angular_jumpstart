import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-behavior-subject-use-cases',
  template: `
    <h1>BehaviorSubject Demo</h1>

    <!-- Use Case 1: Sharing state across components -->
    <h2>Shared State: {{sharedState}}</h2>

    <!-- Use Case 2: Caching -->
    <!-- <button (click)="fetchData()">Fetch Data</button> -->
    <button (click)="fetchAndCacheData()">Fetch Data</button>
    <h2>Data: {{ cachedData$ | async | json }}</h2>

    <!-- Use Case 3: Event Bus -->
    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>
    <h2>Status: {{loginStatus}}</h2>

    <!-- Use Case 4: User Input -->
    <input type="text" #input1 (input)="updateInput(input1.value)">
    <h2>Input: {{inputValue}}</h2>

    <!-- Use Case 5: Real-time Updates -->
    <h2>Chat Room</h2>
    <ul>
      <li *ngFor="let message of messages$ | async">{{message}}</li>
    </ul>
    <input type="text" #input2 (input)="sendMessage(input2.value)">
    <br><br>
    <a routerLink="/directive-http-client">directive-http-client</a>
  `,
  styleUrls: ['./behavior-subject-use-cases.component.css']
})
export class BehaviorSubjectUseCasesComponent implements OnDestroy {
  // Use Case 1: Sharing state across components
  sharedState = '';

  // Use Case 2: Caching
  cachedData$: Observable<any>;
  private cachedDataSubject = new BehaviorSubject<any>(null);
  private cachedDataSubscription!: Subscription;

  // Use Case 3: Event Bus
  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  private loginStatusSubscription: Subscription;
  loginStatus = false;

  // Use Case 4: User Input
  private inputSubject = new BehaviorSubject<string>('');
  private inputSubscription: Subscription;
  inputValue = '';

  // Use Case 5: Real-time Updates
  private messagesSubject = new BehaviorSubject<string[]>([]);
  private messagesSubscription: Subscription;
  messages$: Observable<string[]>;

  constructor() {
    // Use Case 2: Caching
    this.cachedData$ = this.cachedDataSubject.asObservable();

    // Use Case 3: Event Bus
    this.loginStatusSubscription = this.loginStatusSubject.subscribe(status => {
      this.loginStatus = status;
    });

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

  // ngOnDestroy(): void {
  //   // Clean up subscriptions
  //   this.cachedDataSubscription.unsubscribe();
  //   this.loginStatusSubscription.unsubscribe();
  //   this.inputSubscription.unsubscribe();
  //   this.messagesSubscription.unsubscribe();
  // }
  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.cachedDataSubscription) {
      this.cachedDataSubscription.unsubscribe();
    }
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  // Use Case 1: Sharing state across components
  updateSharedState(state: string): void {
    this.sharedState = state;
  }

  // Use Case 2: Caching
  fetchData(): Observable<any> {
    // Simulate API call
    return new Observable(observer => {
      setTimeout(() => {
        const data = { id: 1, name: 'John' };
        console.log('API response:', data); // log the returned data
        observer.next(data);
        observer.complete();
      }, 1000);
    });
  }

  fetchAndCacheData(): void {
    this.fetchData().subscribe(response => {
      this.cachedDataSubject.next(response);
    });
  }

  // Use Case 3: Event Bus
  login(): void {
    this.loginStatusSubject.next(true);
  }

  logout(): void {
    this.loginStatusSubject.next(false);
  }

  // Use Case 4: User Input
  updateInput(value: string): void {
    this.inputSubject.next(value);
  }

  // Use Case 5: Real-time Updates
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
}
