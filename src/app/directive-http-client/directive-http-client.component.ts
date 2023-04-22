import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { DirectiveHttpClientService } from '../directive-http-client.service';

@Component({
  selector: 'app-directive-http-client',
  template: `
    <h2 style="margin-bottom: 40px;">Attribute Directives(ngModel) from FormsModule</h2>
    <form>
      <input type="text" name="filter" [(ngModel)]="filterValue" placeholder="Filter users">
    </form>

    <ul>
      <li *ngFor="let user of filteredUsers">
        {{ user.name }} ({{ user.username }}) - {{ user.email }}
      </li>
    </ul>
    <br><br>
    <a routerLink="/reactiveForms-http-client" style="font-weight: bold; font-size: larger;">reactiveForms-http-client</a>
  `,
  styleUrls: ['./directive-http-client.component.css']
})
export class DirectiveHttpClientComponent implements OnInit {
  users: User[] = [];
  filterValue = '';

  constructor(private directiveHttpClientService: DirectiveHttpClientService) { }

  ngOnInit(): void {
    this.directiveHttpClientService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  get filteredUsers(): User[] {
    const filteredUsers = this.users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(this.filterValue.toLowerCase());
      const usernameMatch = user.username.toLowerCase().includes(this.filterValue.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(this.filterValue.toLowerCase());
      return nameMatch || usernameMatch || emailMatch;
    });

    return filteredUsers;
  } // `get` is a TypeScript keyword that defines a getter for a class property.

}
// ngModel -->
// `ngModel` is an Angular directive that provides two-way data binding between a template form control (such as an input or select element) and a component class property.
// When `ngModel` is used with a form control, any changes made to the form control's value are immediately reflected in the corresponding property 
// in the component class, and any changes made to the property in the component class are immediately reflected in the form control's value.
// Here is an example of how ngModel might be used to bind an input element's value to a component property:
//    <input [(ngModel)]="myProperty">
// In this example, the [(ngModel)] syntax creates a two-way data binding between the input element and the myProperty property 
// in the component class. Any changes made to the input element's value are immediately reflected in the myProperty property, 
// and any changes made to myProperty are immediately reflected in the input element's value.
// To use ngModel, you need to import the FormsModule from @angular/forms in your Angular module.

//---------------------Structural Directives  vs  Attribute Directives---------------------------
// Structural Directives (from CommonModule of BrowserModule) --> 
// Structural directives are responsible for changing the structure of the DOM by adding, removing, or manipulating elements. 
// They are typically used to conditionally show or hide elements, or to repeat elements based on a collection of data. 
// Structural directives are distinguished by an asterisk (*) before their directive name.
// Examples of structural directives in Angular include `*ngIf`, `*ngFor`, and `*ngSwitch`.

// Attribute Directives (from FormsModule) --> 
// Attribute directives, on the other hand, are responsible for modifying the behavior or appearance of an element, component, or template. 
// They are typically used to add or remove CSS classes, set styles, or add event listeners to an element. 
// Attribute directives are applied to an element using the square bracket syntax.
// Examples of attribute directives in Angular include `ngClass`, `ngStyle`, and `ngModel`.
