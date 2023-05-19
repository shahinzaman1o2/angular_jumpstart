import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangestateService } from '../changestate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-child-behavior-subject-use-case-one',
  templateUrl: './child-behavior-subject-use-case-one.component.html',
  styleUrls: ['./child-behavior-subject-use-case-one.component.css']
})
export class ChildBehaviorSubjectUseCaseOneComponent implements OnInit, OnDestroy {
  message!: string;
  currentSate!: string;
  subscription!: Subscription;

  constructor(private stateService: ChangestateService) { }

  ngOnInit() {
    this.currentSate = this.stateService.stateSource.value;
    // this.currentSate = this.stateService.stateSource.getValue();
    this.subscription = this.stateService.currentMessage$.subscribe(message => this.message = message)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
