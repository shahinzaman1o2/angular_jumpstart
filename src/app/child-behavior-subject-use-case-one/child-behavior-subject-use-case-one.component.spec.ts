import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBehaviorSubjectUseCaseOneComponent } from './child-behavior-subject-use-case-one.component';
import { ChangestateService } from '../changestate.service';

describe('ChildBehaviorSubjectUseCaseOneComponent', () => {
  let component: ChildBehaviorSubjectUseCaseOneComponent;
  let fixture: ComponentFixture<ChildBehaviorSubjectUseCaseOneComponent>;
  let stateService: ChangestateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildBehaviorSubjectUseCaseOneComponent],
      providers: [ChangestateService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChildBehaviorSubjectUseCaseOneComponent);
    component = fixture.componentInstance;
    stateService = TestBed.inject(ChangestateService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial state', () => {
    const initialState = 'Initial State';
    expect(component.currentSate).toEqual(initialState);
    const currentStateElement = fixture.nativeElement.querySelector('p:nth-child(2)');
    // it will return the 2nd <p> element from the related child template (child-behavior-subject-use-case-one.component.html)
    // which means --> <p style="color: gray;">Current State ---- {{currentSate}}</p>
    expect(currentStateElement.textContent).toContain(initialState);
  });

  it('should display the shared state', () => {
    const newState = 'New State';
    stateService.changeState(newState);
    fixture.detectChanges();

    expect(component.message).toEqual(newState);
    const sharedStateElement = fixture.nativeElement.querySelector('p:nth-child(4)');
    expect(sharedStateElement.textContent).toContain(newState);
  });

  it('should unsubscribe from the subscription on component destruction', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
