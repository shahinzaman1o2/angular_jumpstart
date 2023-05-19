import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DirectiveHttpClientComponent } from './directive-http-client.component';
import { FormsModule } from '@angular/forms';

describe('DirectiveHttpClientComponent', () => {
  let component: DirectiveHttpClientComponent;
  let fixture: ComponentFixture<DirectiveHttpClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectiveHttpClientComponent],
      imports: [FormsModule, HttpClientTestingModule], // Import the HttpClientTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(DirectiveHttpClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
