import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsHttpClientComponent } from './reactive-forms-http-client.component';

describe('ReactiveFormsHttpClientComponent', () => {
  let component: ReactiveFormsHttpClientComponent;
  let fixture: ComponentFixture<ReactiveFormsHttpClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormsHttpClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsHttpClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
