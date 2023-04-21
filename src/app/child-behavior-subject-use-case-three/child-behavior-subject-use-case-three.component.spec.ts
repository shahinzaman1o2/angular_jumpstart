import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBehaviorSubjectUseCaseThreeComponent } from './child-behavior-subject-use-case-three.component';

describe('ChildBehaviorSubjectUseCaseThreeComponent', () => {
  let component: ChildBehaviorSubjectUseCaseThreeComponent;
  let fixture: ComponentFixture<ChildBehaviorSubjectUseCaseThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildBehaviorSubjectUseCaseThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildBehaviorSubjectUseCaseThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
