import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-child-behavior-subject-use-case-three',
  template: `
    <h3 style="color: gray; margin-top: 0%;">Child Component to Demonstrate the Use Case 3: Event Bus</h3>
    <div *ngIf="loggedIn; else loggedOut">
      Logged in!
      <button (click)="logout()">Log Out</button>
    </div>
    <ng-template #loggedOut>
      Not logged in
    </ng-template>
    <!-- ng-template -->
    <!-- It is used to define a block of elements that are not directly rendered to the DOM. 
    Instead, they are used as a way to group and organize components and elements in the component's template. -->
    <!-- It is used as a template block that can be defined and reused throughout your application. -->
    <!-- it is mostly used to create conditional or dynamic content. 
    You can use structural directives like ngIf or ngFor to control when and how the template block is rendered. -->

    <!-- # (Template reference variables) -->
    <!-- # is used to declare Template reference variables which allow you to reference a template element 
    within your component's template and use it in your component's logic or pass it to other components as input. -->
  `,
  styleUrls: ['./child-behavior-subject-use-case-three.component.css']
})
export class ChildBehaviorSubjectUseCaseThreeComponent implements OnDestroy {
  loggedIn = false;
  subscription!: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.getLoginStatus().subscribe(status => {
      this.loggedIn = status;
    });
  }

  logout() {
    // Perform logout logic
    // ...

    // Update login status
    this.authService.setLoginStatus(false);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
