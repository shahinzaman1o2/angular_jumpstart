import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ChangeStateService } from '../changestate-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-behavior-subject-use-case-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-behavior-subject-use-case-one.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./child-behavior-subject-use-case-one.css']
})
export class ChildBehaviorSubjectUseCaseOne implements OnInit, OnDestroy {
  protected message!: string;
  protected currentSate!: string;
  private subscription!: Subscription;

  constructor(private stateService: ChangeStateService) {};

  ngOnInit() {
    this.initializeCurrentState();
    this.subscribeToMessages();
  }

  private initializeCurrentState() {
    this.currentSate = this.stateService.stateSource.value;
  }

  private subscribeToMessages() {
    this.subscription = this.stateService.currentMessage$.subscribe(
      message => this.message = message
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
