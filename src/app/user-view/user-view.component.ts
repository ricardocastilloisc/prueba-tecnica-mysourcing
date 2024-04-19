import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {
  User,
  RandomUserResponse,
  UserTableRow,
} from '../interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  numVisualizations: number = 100;
  displayedColumns: string[] = [
    'photo',
    'first_name',
    'last_name',
    'email',
    'nationality',
  ];
  sortDirection: 'asc' | 'desc' = 'asc';
  dataSource: MatTableDataSource<UserTableRow>;

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource<UserTableRow>([]);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers = () => {
    this.userService.getUsers(this.numVisualizations).subscribe({
      next: (response: RandomUserResponse) => {
        this.dataSource.data = response.results.map((user) =>
          this.mapUserToTableRow(user)
        );
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  };

  mapUserToTableRow = (user: User): UserTableRow => {
    const { picture, name, email, nat } = user;
    const { medium: photo } = picture;
    const { first: first_name, last: last_name } = name;
    return { photo, first_name, last_name, email, nationality: nat };
  };

  sortData = () => {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      return this.sortDirection === 'asc'
        ? a.nationality.localeCompare(b.nationality)
        : b.nationality.localeCompare(a.nationality);
    });
  };
}
