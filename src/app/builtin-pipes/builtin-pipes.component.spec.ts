import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltinPipesComponent } from './builtin-pipes.component';

describe('BuiltinPipesComponent', () => {
  let component: BuiltinPipesComponent;
  let fixture: ComponentFixture<BuiltinPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuiltinPipesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BuiltinPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update message$ when resend is called', () => {
    const initialMessage$ = component.message$;

    component.resend();

    expect(component.message$).not.toBe(initialMessage$);
  });

  it('should update message$ with the expected values', () => {
    const expectedMessages = ['You are my hero!', 'You are the best hero!', 'Will you be my hero?'];
    let currentIndex = 0;

    component.message$.subscribe(message => {
      expect(message).toEqual(expectedMessages[currentIndex]);
      currentIndex++;
    });

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(currentIndex).toBe(expectedMessages.length);
    });
  });

  // Add more unit tests as needed
});
