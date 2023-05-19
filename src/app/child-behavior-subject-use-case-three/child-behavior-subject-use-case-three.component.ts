import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-child-behavior-subject-use-case-three',
  templateUrl: './child-behavior-subject-use-case-three.component.html',
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
