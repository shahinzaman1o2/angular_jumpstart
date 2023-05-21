import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DirectiveHttpClientComponent } from './directive-http-client.component';
import { FormsModule } from '@angular/forms';
import { DirectiveHttpClientService } from '../directive-http-client.service';
import { of } from 'rxjs';

describe('DirectiveHttpClientComponent', () => {
  let component: DirectiveHttpClientComponent;
  let fixture: ComponentFixture<DirectiveHttpClientComponent>;
  let directiveHttpClientService: DirectiveHttpClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectiveHttpClientComponent],
      imports: [FormsModule, HttpClientTestingModule], // Import the HttpClientTestingModule
      providers: [DirectiveHttpClientService]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectiveHttpClientComponent);
    component = fixture.componentInstance;
    directiveHttpClientService = TestBed.inject(DirectiveHttpClientService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on initialization', () => {
    const mockUsers = [
      { id: 1, name: 'John', username: 'john01', email: 'john@example.com' },
      { id: 2, name: 'Jane', username: 'jane02', email: 'jane@example.com' }
    ];
    spyOn(directiveHttpClientService, 'getUsers').and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(component.users).toEqual(mockUsers);
    expect(directiveHttpClientService.getUsers).toHaveBeenCalled();
  });

  it('should filter users based on the filterValue', () => {
    component.users = [
      { id: 1, name: 'John', username: 'john01', email: 'john@example.com' },
      { id: 2, name: 'Jane', username: 'jane02', email: 'jane@example.com' },
      { id: 3, name: 'David', username: 'david03', email: 'david@example.com' }
    ];
    component.filterValue = 'john';

    const filteredUsers = component.filteredUsers;

    expect(filteredUsers.length).toBe(1);
    expect(filteredUsers[0].name).toBe('John');
  });
});
