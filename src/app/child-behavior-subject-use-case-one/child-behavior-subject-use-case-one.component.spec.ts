import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBehaviorSubjectUseCaseOneComponent } from './child-behavior-subject-use-case-one.component';

describe('ChildBehaviorSubjectUseCaseOneComponent', () => {
  let component: ChildBehaviorSubjectUseCaseOneComponent;
  let fixture: ComponentFixture<ChildBehaviorSubjectUseCaseOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildBehaviorSubjectUseCaseOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildBehaviorSubjectUseCaseOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
