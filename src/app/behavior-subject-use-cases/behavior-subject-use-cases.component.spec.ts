import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubjectUseCasesComponent } from './behavior-subject-use-cases.component';
import { HttpClientModule } from '@angular/common/http';
import { ChildBehaviorSubjectUseCaseOneComponent } from '../child-behavior-subject-use-case-one/child-behavior-subject-use-case-one.component';
import { ChildBehaviorSubjectUseCaseThreeComponent } from '../child-behavior-subject-use-case-three/child-behavior-subject-use-case-three.component';
import { FormsModule } from '@angular/forms';

describe('BehaviorSubjectUseCasesComponent', () => {
  let component: BehaviorSubjectUseCasesComponent;
  let fixture: ComponentFixture<BehaviorSubjectUseCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BehaviorSubjectUseCasesComponent,
        ChildBehaviorSubjectUseCaseOneComponent,
        ChildBehaviorSubjectUseCaseThreeComponent
      ], // Add the child component here
      imports: [HttpClientModule, FormsModule] // Add HttpClientModule here
    })
      .compileComponents();

    fixture = TestBed.createComponent(BehaviorSubjectUseCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
