import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating app';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString: string | null = localStorage.getItem('user');
    if (userString !== null) {
        const user: User = JSON.parse(userString);
        this.accountService.setCurrentUser(user);
    }
  }
}
