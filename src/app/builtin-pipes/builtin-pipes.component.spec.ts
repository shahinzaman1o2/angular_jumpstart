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

  it('should update message$ with the expected values', (done: DoneFn) => {
    // In Jasmine, the done parameter and DoneFn are used for handling asynchronous tests.
    // The done function (of type DoneFn) is a callback that you can call to notify Jasmine that an asynchronous operation in your test has completed. 
    // It allows Jasmine to properly wait for the completion of asynchronous tasks before considering the test complete.
    const expectedMessages = ['You are my hero!', 'You are the best hero!', 'Will you be my hero?'];
    // expectedMessages.length = 3
    let currentIndex = 0;

    component.message$.subscribe(message => {
      expect(message).toEqual(expectedMessages[currentIndex]);
      currentIndex++;

      if (currentIndex === expectedMessages.length) {
        done(); // Notify Jasmine that the asynchronous test is complete
      }
    });

    fixture.detectChanges();
  });

  // Add more unit tests as needed
});
