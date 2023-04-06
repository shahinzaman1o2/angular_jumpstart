import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableUseCasesComponent } from './observable-use-cases.component';

describe('ObservableUseCasesComponent', () => {
  let component: ObservableUseCasesComponent;
  let fixture: ComponentFixture<ObservableUseCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservableUseCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableUseCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
