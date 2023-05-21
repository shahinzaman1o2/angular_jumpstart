import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReactiveFormsHttpClientComponent } from './reactive-forms-http-client.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsHttpClientService } from '../reactive-forms-http-client.service';
import { User } from '../user.model';
import { of } from 'rxjs';

describe('ReactiveFormsHttpClientComponent', () => {
  let component: ReactiveFormsHttpClientComponent;
  let fixture: ComponentFixture<ReactiveFormsHttpClientComponent>;
  let service: ReactiveFormsHttpClientService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { id: 1, name: 'John', username: 'john123', email: 'john@example.com' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormsHttpClientComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ReactiveFormsHttpClientService, FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsHttpClientComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ReactiveFormsHttpClientService);
    httpMock = TestBed.inject(HttpTestingController);

    // Mock the getUsers request
    spyOn(service, 'getUsers').and.returnValue(of(mockUsers));

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users based on the filter value', () => {
    component.users = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'johndoe@example.com' },
      { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'janesmith@example.com' }
    ];

    component.filterForm.get('filter')?.setValue('joh');
    const filteredUsers = component.filteredUsers;

    expect(filteredUsers.length).toBe(1);
    expect(filteredUsers[0].name).toBe('John Doe');
  });

  it('should submit the form when valid', () => {
    const validFormData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678'
    };
    component.formGroup.setValue(validFormData);
    const consoleSpy = spyOn(console, 'log');

    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', validFormData);
  });

  it('should not submit the form when invalid', () => {
    const invalidFormData = {
      name: '',
      email: 'invalidemail',
      password: '123'
    };
    component.formGroup.setValue(invalidFormData);
    const consoleSpy = spyOn(console, 'log');

    component.onSubmit();

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
