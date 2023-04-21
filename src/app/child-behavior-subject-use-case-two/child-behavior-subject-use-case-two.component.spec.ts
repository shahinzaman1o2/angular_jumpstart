import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBehaviorSubjectUseCaseTwoComponent } from './child-behavior-subject-use-case-two.component';

describe('ChildBehaviorSubjectUseCaseTwoComponent', () => {
  let component: ChildBehaviorSubjectUseCaseTwoComponent;
  let fixture: ComponentFixture<ChildBehaviorSubjectUseCaseTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildBehaviorSubjectUseCaseTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildBehaviorSubjectUseCaseTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
