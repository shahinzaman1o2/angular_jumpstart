import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubjectUseCasesComponent } from './behavior-subject-use-cases.component';

describe('BehaviorSubjectUseCasesComponent', () => {
  let component: BehaviorSubjectUseCasesComponent;
  let fixture: ComponentFixture<BehaviorSubjectUseCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviorSubjectUseCasesComponent ]
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
