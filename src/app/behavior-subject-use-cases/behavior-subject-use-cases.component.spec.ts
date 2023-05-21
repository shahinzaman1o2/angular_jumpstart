import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BehaviorSubjectUseCasesComponent } from './behavior-subject-use-cases.component';
import { ChangestateService } from '../changestate.service';
import { AuthService } from '../auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChildBehaviorSubjectUseCaseOneComponent } from '../child-behavior-subject-use-case-one/child-behavior-subject-use-case-one.component';
import { ChildBehaviorSubjectUseCaseThreeComponent } from '../child-behavior-subject-use-case-three/child-behavior-subject-use-case-three.component';
import { FormsModule } from '@angular/forms';

describe('BehaviorSubjectUseCasesComponent', () => {
  let component: BehaviorSubjectUseCasesComponent;
  let fixture: ComponentFixture<BehaviorSubjectUseCasesComponent>;
  let stateService: ChangestateService;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BehaviorSubjectUseCasesComponent,
        ChildBehaviorSubjectUseCaseOneComponent,
        ChildBehaviorSubjectUseCaseThreeComponent
      ],
      imports: [HttpClientModule, FormsModule, HttpClientTestingModule],
      providers: [ChangestateService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(BehaviorSubjectUseCasesComponent);
    component = fixture.componentInstance;
    stateService = TestBed.inject(ChangestateService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    httpMock.verify();
  });

  it('should share state with child component', () => {
    const message = 'Test Message';
    spyOn(stateService, 'changeState');
    component.message = message;
    component.shareState();
    expect(stateService.changeState).toHaveBeenCalledWith(message);
  });

  it('should fetch and cache data', () => {
    const mockData = [{ id: 1, title: 'Product 1' }, { id: 2, title: 'Product 2' }];
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(of(mockData));

    component.fetchData();
    expect(http.get).toHaveBeenCalledWith('https://fakestoreapi.com/products?limit=3');
    expect(component.cachedData$).toBeTruthy();
    expect(component.cachedDataSubject.getValue()).toEqual(mockData);
  });

  it('should update the input value', () => {
    const inputValue = 'Test Input';
    component.updateInput(inputValue);
    expect(component.inputValue).toEqual(inputValue);
    expect(component.inputSubject.getValue()).toEqual(inputValue);
  });

  it('should send and receive messages in real-time', () => {
    const messages = ['Hello', 'How are you?'];
    component.sendMessage(messages[0]);
    component.sendMessage(messages[1]);
    expect(component.messagesSubject.getValue()).toEqual(messages);

    const asyncMessages = component.messages$;
    let receivedMessages: string[] = [];
    asyncMessages.subscribe((msgs) => {
      receivedMessages = msgs;
    });

    expect(receivedMessages).toEqual(messages);
  });

  it('should update login status', () => {
    spyOn(authService, 'setLoginStatus');
    component.login();
    expect(authService.setLoginStatus).toHaveBeenCalledWith(true);
  });
});
