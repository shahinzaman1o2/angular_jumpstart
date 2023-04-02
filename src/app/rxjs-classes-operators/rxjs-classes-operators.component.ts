import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, of, fromEvent, BehaviorSubject, merge, Subscription } from 'rxjs';
import { map, filter, take, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-classes-operators',
  templateUrl: './rxjs-classes-operators.component.html',
  styleUrls: ['./rxjs-classes-operators.component.css']
})
export class RxjsClassesOperatorsComponent implements OnDestroy {
  greeting$: Observable<string>;
  items: any[];
  lastKeyPressed!: string;
  counterSubscription!: Subscription;

  constructor() {
    // Observable of a greeting string
    this.greeting$ = of('Hello, RxJS!').pipe(
      map(greeting => `${greeting} How are you today?`)
    );

    // Observable that emits an array of items every second
    const item$ = this.createItemObservable();

    // Array of items generated from the item$ observable
    this.items = [];
    this.counterSubscription = item$.subscribe(item => this.items.push(item));

    // BehaviorSubject that stores the last key pressed
    const lastKeyPressed$ = new BehaviorSubject<string>('');

    // Merge the input$ observable into the lastKeyPressed$ BehaviorSubject
    merge(fromEvent(document, 'keydown')).pipe(
      filter(event => event.target instanceof HTMLInputElement),
      map(event => (event.target as HTMLInputElement).value),
      switchMap(key => {
        lastKeyPressed$.next(key);
        return lastKeyPressed$.asObservable();
      })
    ).subscribe(key => this.lastKeyPressed = key);
  }

  private createItemObservable(): Observable<any[]> {
    return interval(1000).pipe(
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
  }

  start() {
    console.log('Started!');
    const item$ = this.createItemObservable();
    this.items = [];
    this.counterSubscription = item$.subscribe(items => this.items.push(...items));
  }

  stop() {
    console.log('Stopped!');
    this.counterSubscription.unsubscribe();
  }

  ngOnDestroy() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
