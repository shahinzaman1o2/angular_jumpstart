import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBehaviorSubjectUseCaseThreeComponent } from './child-behavior-subject-use-case-three.component';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

describe('ChildBehaviorSubjectUseCaseThreeComponent', () => {
  let component: ChildBehaviorSubjectUseCaseThreeComponent;
  let fixture: ComponentFixture<ChildBehaviorSubjectUseCaseThreeComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildBehaviorSubjectUseCaseThreeComponent],
      providers: [AuthService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChildBehaviorSubjectUseCaseThreeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    // Emit initial value of true
    authService.setLoginStatus(true);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to login status changes', () => {
    const loginStatusSubject = new BehaviorSubject<boolean>(true);
    spyOn(authService, 'getLoginStatus').and.returnValue(loginStatusSubject.asObservable());

    fixture.detectChanges();

    expect(component.loggedIn).toBeTrue();

    loginStatusSubject.next(false);

    expect(component.loggedIn).toBeTrue();
  });

  it('should call setLoginStatus with false when logout is called', () => {
    spyOn(authService, 'setLoginStatus');

    component.logout();

    expect(authService.setLoginStatus).toHaveBeenCalledWith(false);
  });

  it('should unsubscribe from the subscription on component destruction', () => {
    spyOn(component.subscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
