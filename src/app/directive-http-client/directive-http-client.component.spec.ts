import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiveHttpClientComponent } from './directive-http-client.component';

describe('DirectiveHttpClientComponent', () => {
  let component: DirectiveHttpClientComponent;
  let fixture: ComponentFixture<DirectiveHttpClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectiveHttpClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectiveHttpClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
