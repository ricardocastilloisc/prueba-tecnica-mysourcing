import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {
  User,
  RandomUserResponse,
  UserTableRow,
} from '../interfaces/user.interface'; // Importamos las interfaces

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  users: UserTableRow[] = [];
  numVisualizations: number = 100;
  displayedColumns: string[] = [
    'photo',
    'first_name',
    'last_name',
    'email',
    'nationality',
  ];
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers(this.numVisualizations).subscribe(
      (response: RandomUserResponse) => {
        this.users = response.results.map(this.mapUserToTableRow);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  mapUserToTableRow({ picture, name, email, nat }: User): UserTableRow {
    const { medium: photo } = picture;
    const { first: first_name, last: last_name } = name;
    return { photo, first_name, last_name, email, nationality: nat };
  }
}
