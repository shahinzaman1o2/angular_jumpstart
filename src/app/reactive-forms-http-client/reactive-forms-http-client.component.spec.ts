import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReactiveFormsHttpClientComponent } from './reactive-forms-http-client.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ReactiveFormsHttpClientComponent', () => {
  let component: ReactiveFormsHttpClientComponent;
  let fixture: ComponentFixture<ReactiveFormsHttpClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormsHttpClientComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule], // Import the HttpClientTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsHttpClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
