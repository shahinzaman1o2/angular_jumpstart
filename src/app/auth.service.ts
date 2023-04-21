import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  // This `BehaviorSubject` acts as an event bus that emits events whenever the login status is updated using the `setLoginStatus()` method.
  // The `ChildBehaviorSubjectUseCaseThreeComponent` component subscribes to this event bus using the `getLoginStatus()` method 
  // of the `AuthService` class, and updates its `loggedIn` property whenever an event is emitted.
  // So, any changes to the login status made in the `login()` method of the `BehaviorSubjectUseCasesComponent` class will be communicated 
  // to the `ChildBehaviorSubjectUseCaseThreeComponent` component through the `AuthService` event bus.

  constructor() { }

  setLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }

  getLoginStatus() {
    return this.loginStatus.asObservable();
  }

}
