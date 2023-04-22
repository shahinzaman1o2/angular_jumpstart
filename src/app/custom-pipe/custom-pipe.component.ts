import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 style="margin-bottom: 40px;">Custom Pipes</h1>

    <h3>Heroes from JSON File</h3>

    <div *ngFor="let hero of ('assets/heroes.json' | fetch) ">
      {{hero.name}}
    </div>

    <p>Heroes as JSON:
      {{'assets/heroes.json' | fetch | json}}
    </p>
  `
})
export class CustomPipeComponent { }