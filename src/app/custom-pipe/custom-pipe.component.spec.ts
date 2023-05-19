import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPipeComponent } from './custom-pipe.component';
import { FetchJsonPipe } from '../fetch-json.pipe';
import { HttpClientModule } from '@angular/common/http';

describe('CustomPipeComponent', () => {
  let component: CustomPipeComponent;
  let fixture: ComponentFixture<CustomPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomPipeComponent, FetchJsonPipe], // Declare the FetchPipe
      imports: [HttpClientModule], // Import HttpClientModule
    }).compileComponents();

    fixture = TestBed.createComponent(CustomPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
