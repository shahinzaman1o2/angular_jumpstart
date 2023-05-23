import { TestBed } from '@angular/core/testing';
// TestBed class provides several static methods and properties to set up and configure the testing environment.
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // `describe` function is used for organizing and grouping related test cases.
  // it takes two parameters: a string that describes the test suite or feature being tested, and a callback function that contains the individual test cases or nested describe blocks.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // configureTestingModule: This method is used to configure the object with properties such as imports, declarations, providers, etc., to define the necessary dependencies for the component or service being tested.
      imports: [
        RouterTestingModule
        // The RouterTestingModule provides a configuration and setup for testing components that interact with Angular's router. It allows you to mock the router behavior and provides utility methods for navigating and manipulating the router state during testing.
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    // compileComponents: This method is used to compile the components declared in the testing module. It can be awaited to ensure that the component templates are compiled before running the tests.
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // createComponent: This method creates an instance of a component within the testing environment. It returns a `ComponentFixture` object that provides access to the component instance, the component's DOM element, and utility methods for testing the component.
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular_app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular_app');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   // detectChanges() is a method provided by Angular's testing utilities that triggers change detection for a component. It is used in unit tests to manually update the component's view and apply any changes that have occurred.
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   // This line retrieves the native DOM element associated with the component fixture. It is cast to HTMLElement to allow interaction with the DOM.
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('angular_app app is running!');
  // });
});
