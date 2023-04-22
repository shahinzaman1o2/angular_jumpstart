// pipes are a feature that allows you to transform data before displaying it in the template. 
// Pipes are essentially functions that take some input data and return transformed output data.
//----------------------------------------------------------------------------------------------
import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-directive-http-client',
  template: `
    <h1 style="margin-bottom: 40px;">Built-In Pipes</h1>
    <!-- Pure pipes: DatePipe, DecimalPipe, PercentPipe, CurrencyPipe, UpperCasePipe, LowerCasePipe, KeyValuePipe, 
    and JsonPipe are all pure pipes because they do not have any side effects and their output only depends on their input parameters. -->
    <p>DatePipe: {{ today | date }}</p>
    <p>DecimalPipe: {{ pi | number:'1.2-3' }}</p>
    <p>PercentPipe: {{ rate | percent }}</p>
    <p>CurrencyPipe: {{ price | currency:'USD':'symbol':'1.2-2' }}</p>
    <p>UpperCasePipe: {{ message | uppercase }}</p>
    <p>LowerCasePipe: {{ message | lowercase }}</p>
    <p>KeyValuePipe: {{ user | keyvalue | json }}</p>
    <p>JsonPipe: {{ user | json }}</p>
    <!-- Impure pipe: AsyncPipe is an impure pipe because it has side effects (i.e., it subscribes to an observable) 
    and its output can change over time depending on the state of the observable. -->
    <h4>AsyncPipe: {{ message$ | async }}</h4>
    <button type="button" (click)="resend()">Resend</button>
    <br><br><br><br>

    <a routerLink="/custom-pipe" style="font-weight: bold; font-size: larger;">custom-pipe</a>
  `,
  styleUrls: ['./builtin-pipes.component.css']
})
export class BuiltinPipesComponent {
  today = new Date();
  pi = 3.14159265;
  rate = 0.75;
  price = 199.99;
  message = 'Hello, World!'; // Title Case
  message$: Observable<string>;
  user = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com'
  };
  private messages = ['You are my hero!', 'You are the best hero!', 'Will you be my hero?'];

  constructor() {
    this.message$ = this.getResendObservable();
  }

  resend() {
    this.message$ = this.getResendObservable();
  }

  private getResendObservable() {
    return interval(500).pipe(
      map(i => this.messages[i]),
      take(this.messages.length)
    );
  }
}

//    <p>DecimalPipe: {{ pi | number:'1.2-3' }}</p>
// The '1.2-3' argument is a formatting string that tells the pipe to format the number with **-minimum of one digit before 
// the decimal point, **-minimum of two digits after the decimal point, and a minimum of three digits before rounding.

// The data got from api responses is in type of **--- keyvalue-json ---**

//------------- `async` pipe --------------
// asynchronous operations, such as fetching data from an API, are often handled using Observables, which emit a stream of values over time. 
// The async pipe is used to subscribe to an Observable and automatically update the view with new values as they are emitted.

//***--The async pipe takes care of subscribing to the Observable, and unsubscribing when the component is destroyed, to prevent memory leaks.--***

// Using the async pipe simplifies the code and makes it more readable by removing the need for manual subscription and update logic.
// Hence, it's named as async pipe to indicate its primary purpose of working with asynchronous data streams.
