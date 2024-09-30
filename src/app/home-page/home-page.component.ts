import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  routes = this.router.config.filter(r => r.path && r.component);
  descriptions: { [key: string]: string } = {
    'js_ts-builtin-funcs': 'Most used Built-in JavaScript & TypeScript functions.\nThe project relevant files contain documentation info about this & the necessary info.',
    'student-table': 'The Tables are created using JavaScript Data Structures, Interface & Types.\nThe project relevant files contain documentation info about this & the necessary info.',
    'apiProduct-category': 'Products Category by making Asynchronous api call using : async - await - Promise (& axios).\nThe project relevant files contain documentation info about this & the necessary info.',
    'observable-use-cases': 'Asynchronous data handling & Data transformation - Event handling & Reactive programming.\nThe project relevant files contain documentation info about this & the necessary info.',
    'observable-with-operators': 'Observable operators - RxJS integration.\nThe project relevant files contain documentation info about this & the necessary info.',
    'behavior-subject-use-cases': 'Sharing state across components - Caching - Event Bus - User Input - Real-time Updates.\nThe project relevant files contain documentation info about this & the necessary info.',
    'directive-http-client': 'Attribute Directives(ngModel) from FormsModule.\nThe project relevant files contain documentation info about this & the necessary info.',
    'reactiveForms-http-client': 'ReactiveForms (from ReactiveFormsModule).\nThe project relevant files contain documentation info about this & the necessary info.',
    'builtin-pipes': 'Usage of built-in Angular pipes - Transformation of data.\nThe project relevant files contain documentation info about this & the necessary info.',
    'custom-pipe': 'Creating custom pipes in Angular - How to extend built-in functionality.\nThe project relevant files contain documentation info about this & the necessary info.'
  };

  constructor(private router: Router) { }

  formatTitle(path: string): string {
    return path.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }

  openLinkInNewTab(path: string): void {
    const url = this.router.serializeUrl(this.router.createUrlTree([path]));
    window.open(url, '_blank');
  }

  // Helper function to split descriptions into lines for bullet points
  splitDescription(path: string | undefined): string[] {
    if (!path) return ['No description available'];
    const description = this.descriptions[path] || 'No description available';
    return description.split('\n'); // Splits the description into lines at every line break.
  }
}
