import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableUseCasesComponent } from './observable-use-cases.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ObservableUseCasesComponent', () => {
  let component: ObservableUseCasesComponent;
  let fixture: ComponentFixture<ObservableUseCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ObservableUseCasesComponent]
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
