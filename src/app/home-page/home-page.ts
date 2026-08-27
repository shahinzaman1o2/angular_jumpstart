import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, CommonModule], // Provides common directives and pipes
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./home-page.css']
})
export class HomePage {
  protected readonly routes: any[];

  constructor(private router: Router) {
    this.routes = this.router.config.filter(
      (route) =>
        route.path &&
        route.path !== '**' &&
        (route.loadComponent || route.component)
    );
  }

  private readonly titles: Record<string, string> = {
    'js_ts-builtin-funcs': 'Js_Ts Builtin Functions',
    'student-table': 'Js_Ts Data Structures',
    'apiProduct-category': 'Angular HttpClient & RxJS Observable',
    'observable-use-cases': 'RxJS Observable',
    'observable-with-operators': 'RxJS Observable with Operators',
    'behavior-subject-use-cases': 'RxJS BehaviorSubject',
    'pipes-use-cases': 'Angular Pipes',
  };

  private readonly useCaseLabels: Record<string, string> = {
    'js_ts-builtin-funcs':
      'Use Cases (handles strings, arrays, math & TypeScript types):',
    'student-table':
      'Use Cases (handles data structures, types & calculations):',
    'apiProduct-category':
      'Use Cases (handles HttpClient, RxJS Observable & AsyncPipe):',
    'observable-use-cases':
      'Use Cases (handles async data, transformation, cancellation & reactive events):',
    'observable-with-operators':
      'Use Cases (handles RxJS operators, data transformation & events):',
    'behavior-subject-use-cases':
      'Use Cases (handles state sharing, caching, events, user input & real-time updates):',
    'pipes-use-cases':
      'Use Cases (handles data transformation):',
  };

  private readonly descriptions: Record<string, string> = {
    'js_ts-builtin-funcs': `
      String & Array Functions
      Math Functions
      TypeScript Utility Types
      Type Assertion & Type Checking
      Type Conversion`,

    'student-table': `
      Interfaces & Type Definitions
      Nested Data Structures
      Array Iteration
      Data Aggregation
      Ranking Calculations`,

    'apiProduct-category': `
      HTTP API Requests
      Category-Based Data Fetching
      RxJS Observable
      AsyncPipe
      User Interaction & Async Data`,

    'observable-use-cases': `
      Asynchronous Data Handling
      Data Transformation
      Request Cancellation
      Event Handling
      Reactive Programming`,

    'observable-with-operators': `
      Observable Creation
      Data Transformation
      Filtering & Limiting
      Event Stream Merging
      Stream Switching
      Event Handling`,

    'behavior-subject-use-cases': `
      Shared State Management
      Component Communication
      Data Caching
      Event Bus
      User Input Handling
      Real-Time Updates`,

    'pipes-use-cases': `
      Built-in Pipes
      AsyncPipe & Observable Data
      KeyValue & Json Transformation
      Custom File Size Pipe
      Custom Relative Time Pipe`
  };

  protected formatTitle(path: string): string {
    return (
      this.titles[path] ??
      path
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
    );
  }

  protected getUseCaseLabel(path: string): string {
    return this.useCaseLabels[path] ?? '';
  }

  protected splitDescription(path: string): string[] {
    const description = this.descriptions[path] ?? '';

    return description
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }
}
