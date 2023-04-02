import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { DirectiveHttpClientService } from '../directive-http-client.service';

@Component({
  selector: 'app-directive-http-client',
  templateUrl: './directive-http-client.component.html',
  styleUrls: ['./directive-http-client.component.css']
})
export class DirectiveHttpClientComponent implements OnInit {
  users: User[] = [];
  filterValue = '';

  constructor(private directiveHttpClientService: DirectiveHttpClientService) { }

  ngOnInit(): void {
    this.directiveHttpClientService.getUsers().subscribe(users => {
      this.users = users;
    });
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
