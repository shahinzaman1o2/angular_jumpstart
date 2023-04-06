import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableWithOperatorsComponent } from './observable-with-operators.component';

describe('ObservableWithOperatorsComponent', () => {
  let component: ObservableWithOperatorsComponent;
  let fixture: ComponentFixture<ObservableWithOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservableWithOperatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableWithOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
