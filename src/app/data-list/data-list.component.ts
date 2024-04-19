import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {
  User,
  RandomUserResponse,
  UserTableRow,
} from '../interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit {
  dataSource: MatTableDataSource<UserTableRow>;
  pageSizeOptions: number[] = [5, 10, 20];
  columnsLimit: number = 5;
  inputFilter: string = '';
  displayedColumns: string[] = [
    'photo',
    'first_name',
    'last_name',
    'email',
    'nationality',
    'delete',
  ];

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource<UserTableRow>([]);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers = () => {
    this.inputFilter = '';
    this.dataSource.filter = '';
    this.userService.getUsers(this.columnsLimit).subscribe({
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

  setColumnsLimit = (limit: number) => {
    this.columnsLimit = limit;
    this.getUsers();
  };

  applyFilter = () => {
    this.dataSource.filter = this.inputFilter.trim().toLowerCase();
  };

  deleteUser = (email: string) => {
    const index = this.dataSource.data.findIndex(
      (user) => user.email === email
    );
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<UserTableRow>(
        this.dataSource.data
      );
    }
  };
}
