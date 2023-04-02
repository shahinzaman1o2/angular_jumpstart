import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-directive-http-client',
  templateUrl: './builtin-pipes.component.html',
  styleUrls: ['./builtin-pipes.component.css']
})
export class BuiltinPipesComponent {
  today = new Date();
  pi = 3.14159265;
  rate = 0.75;
  price = 199.99;
  message = 'Hello, World!';
  message$: Observable<string>;
  data$ = new Promise(resolve => setTimeout(() => resolve('Async Data'), 2000));
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
