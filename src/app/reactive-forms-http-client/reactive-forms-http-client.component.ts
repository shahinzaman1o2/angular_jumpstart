import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';
import { ReactiveFormsHttpClientService } from '../reactive-forms-http-client.service';

@Component({
  selector: 'app-reactive-forms-http-client',
  template: `
    <h2 style="margin-bottom: 40px;">ReactiveForms (from ReactiveFormsModule)</h2>

    <form [formGroup]="filterForm">
      <input type="text" formControlName="filter" placeholder="Filter users">
    </form>

    <ul>
      <li *ngFor="let user of filteredUsers">
        {{ user.name }} ({{ user.username }}) - {{ user.email }}
      </li>
    </ul>
    <br><br>

    <!-- can't be implemented using attribute directives (ngModel) but can be implemented using Reactive Forms -->
    <h2 style="margin-bottom: 40px;">A Form that can't be implemented using attribute directives (ngModel) but can be implemented using Reactive Forms --> </h2>
    <form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="name" placeholder="Enter your name">
      <input type="email" formControlName="email" placeholder="Enter your email">
      <input type="password" formControlName="password" placeholder="Enter your password">
      <button type="submit" [disabled]="formGroup.invalid">Submit</button>
    </form>
    <br><br><br><br>

    <a routerLink="/builtin-pipes" style="font-weight: bold; font-size: larger;">builtin-pipes</a>
  `,
  styleUrls: ['./reactive-forms-http-client.component.css']
})
export class ReactiveFormsHttpClientComponent implements OnInit {
  users: User[] = [];
  filterForm!: FormGroup;
  // can't be implemented using attribute directives (ngModel) but can be implemented using Reactive Forms
  formGroup!: FormGroup;

  constructor(private reactiveFormsHttpClientService: ReactiveFormsHttpClientService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filter: ''
    });
    // The empty string ('') is used as the initial value for the form control. 
    // When the user types into the form, the value of the form control is updated with the user's input.

    this.reactiveFormsHttpClientService.getUsers().subscribe(users => {
      this.users = users;
    });

    // can't be implemented using attribute directives (ngModel) but can be implemented using Reactive Forms
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    // The empty string ('') is used as the initial value for the form control. In this case, the form controls for 'name', 'email', 
    // and 'password' are initialized with empty string values. This is a common practice when creating forms in Angular using 
    // the FormBuilder service. When the user types into the form, the value of the form control is updated with the user's input. 
  }

  get filterValue(): string {
    return this.filterForm.get('filter')?.value || '';
  }

  get filteredUsers(): User[] {
    const filteredUsers = this.users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(this.filterValue.toLowerCase());
      const usernameMatch = user.username.toLowerCase().includes(this.filterValue.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(this.filterValue.toLowerCase());
      return nameMatch || usernameMatch || emailMatch;
    });

    return filteredUsers;
  }

  // can't be implemented using attribute directives (ngModel) but can be implemented using Reactive Forms
  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);
    }
  }

}

// FormGroup --> 
// FormGroup in Angular is a group of related form controls. It helps you organize and manage a collection of form controls, like input fields,
// checkboxes, and radio buttons, as a single unit.
// Using a FormGroup, you can define the structure and initial values of the form controls, and also perform validation and submission of the form.
// For example, if you have a form with multiple fields like "name", "email", "phone number", and "address", you can create a FormGroup 
// to group these fields together and manage them as a single entity.

// FormBuilder --> 
// FormBuilder is a service provided by Angular to simplify the creation of reactive forms in your Angular applications. It provides a set of methods that can be used to create form controls and groups, and it handles the initialization of those form elements.
// With FormBuilder, you can define your form structure in a more concise and readable way. It allows you to specify the form controls and their initial values, as well as any validators and async validators for each control.
// By using FormBuilder, we can easily create complex forms with many form controls and validators, and it makes our code more readable and maintainable.

// Validators --> 
// Validators are functions used to validate user input in forms. They check if a field meets certain conditions, such as being required, having a minimum or maximum length, or containing only certain characters.
// Validators can be used in both template-driven forms (with ngModel) and reactive forms (with FormBuilder).
// In reactive forms, validators are applied to individual form controls using the Validators class, which provides a set of pre-defined validators. 
// Custom validators can also be created by writing a function that returns a validation error object if the input is invalid.

//-------------Attribute Directives (from FormsModule) vs ReactiveForms (ReactiveFormsModule)----------------

// Attribute Directives (from FormsModule):
// Attribute directives are a feature of the `FormsModule` in Angular that allow you to add behavior to HTML elements based on their attributes. 
// They are used to manipulate the appearance or behavior of form elements, for example, by adding validation rules or disabling/enabling fields based on user input.
// Attribute directives are used in template-driven forms, which are a simpler and less flexible way of building forms in Angular.

// ReactiveForms (from ReactiveFormsModule):
// Reactive forms are a feature of the `ReactiveFormsModule` in Angular that provide a more powerful and flexible way of building forms.
// Reactive forms use an object-oriented approach to represent form controls and their values, allowing for more complex validation, dynamic form controls, and better testability. 
// Reactive forms are built using TypeScript classes and use the `FormGroup`, `FormControl`, and `FormArray` classes to define and manage form controls.
