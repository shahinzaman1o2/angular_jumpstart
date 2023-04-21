import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangestateService } from '../changestate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-child-behavior-subject-use-case-one',
  template: `
  <div style="border: 1px solid crimson;">
    <h3 style="color: gray; margin-top: 0%;">Child Component to Demonstrate the Use Case 1: Sharing state across components</h3>
    <p style="color: gray;">Current State ---- {{currentSate}}</p>
    <p style="color: gray; margin-bottom: 45px">Note: This Current State won't change at realtime</p>
    <!-- Note: This Current State won't be changed after clicking [Share State to Child] button because the Current State's 
    property(currentSate) isn't subscribed to the data stream from an Observable and that's why it won't get the realtime update -->
    <!-- Note: To get any kind of realtime update with BehaviorSubject, we have to use a readOnly Observable of the BehaviorSubject -->
    <!-- Note: To access any kind of realtime data or data stream, the realtime data or data stream must be declare as an Observable -->

    <!-- The Current State will change after changing the route from the ParentComponent and navigate back to it -->
    <!-- reason: --> 
    <!--*** when a parent component is destroyed and recreated due to a route change, any child components that are part 
    of the parent component's view hierarchy will also be destroyed and recreated. ***-->
    <!-- This is because the Angular framework follows a hierarchical tree-like structure for components, where parent components 
    contain child components in their view hierarchy. When a parent component is destroyed, Angular automatically destroys all of 
    its child components along with it. Similarly, when a parent component is recreated, Angular also recreates all of its child components. -->
    <!--*** However, if the child components have any state or data that is being persisted in a service or another external source, 
    that data will not be lost during the destruction and recreation process. This is because services and external sources 
    of data are separate from the component hierarchy and are not affected by changes to the component tree. ***-->
    <!--*** When Angular reuses existing child component instances, the component's lifecycle methods will be called again, 
    which includes the ngOnInit, ngOnChanges, ngDoCheck, and other lifecycle hooks. ***-->
    <!-- This means that the component will be initialized and checked for changes again, and any modifications made 
    to the component's state or template will be reflected in the view. -->
    <!-- So while the component instance itself is not destroyed and recreated, it will be refreshed and updated to reflect 
    any changes that may have occurred while the parent component was destroyed. -->
    <!--*** So by the route from the ParentComponent(BehaviorSubjectUseCasesComponent), the ChildComponent(ChildBehaviorSubjectUseCaseOneComponent) 
    will not destroy but it will call it's lifecycle method(ngOnInit) again 
    and because of this the Current State's property(currentSate) will get the current state stored inside of the BehaviorSubject. 
    In this case, which will be equal to the Shared State -->

    <p>Shared State ----- {{message}}</p>
    <p style="color: gray; margin-bottom: 0%;">Note: This Shared State will change at realtime</p>
    <!-- Note: This Shared State will be changed after clicking [Share State to Child] button because the Shared State's 
    property(message) is subscribed to the data stream from an Observable and that's why it'll get the realtime update -->
  </div>
  `,
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
