import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../user.model';
import { ReactiveFormsHttpClientService } from '../reactive-forms-http-client.service';

@Component({
  selector: 'app-reactive-forms-http-client',
  templateUrl: './reactive-forms-http-client.component.html',
  styleUrls: ['./reactive-forms-http-client.component.css']
})
export class ReactiveFormsHttpClientComponent implements OnInit {
  users: User[] = [];
  filterForm!: FormGroup;

  constructor(private reactiveFormsHttpClientService: ReactiveFormsHttpClientService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filter: ''
    });

    this.reactiveFormsHttpClientService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  get filterValue(): string {
    return this.filterForm.get('filter')?.value || '';
  }

  get filteredUsers(): User[] {
    const filteredUsers = this.users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(this.filterValue.toLowerCase());
      const usernameMatch = user.username.toLowerCase().includes(this.filterValue.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(this.filterValue.toLowerCase());
      return nameMatch || usernameMatch || emailMatch;
    });

    return filteredUsers;
  }
}
