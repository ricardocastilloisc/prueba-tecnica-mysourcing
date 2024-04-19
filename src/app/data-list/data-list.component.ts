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

  sortDirectionNationality: 'asc' | 'desc' = 'asc';
  sortDirectionEmail: 'asc' | 'desc' = 'asc';
  sortDirectionLastName: 'asc' | 'desc' = 'asc';
  sortDirectionFirstName: 'asc' | 'desc' = 'asc';

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

  sortDataNationality = () => {
    this.sortDirectionNationality = this.sortDirectionNationality === 'asc' ? 'desc' : 'asc';
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      return this.sortDirectionNationality === 'asc' ? a.nationality.localeCompare(b.nationality) : b.nationality.localeCompare(a.nationality);
    });
  }
  sortDataEmail = () => {
    this.sortDirectionEmail = this.sortDirectionEmail === 'asc' ? 'desc' : 'asc';
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      return this.sortDirectionEmail === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    });
  }
  sortDataLastName = () => {
    this.sortDirectionLastName = this.sortDirectionLastName === 'asc' ? 'desc' : 'asc';
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      return this.sortDirectionLastName === 'asc' ? a.last_name.localeCompare(b.last_name) : b.last_name.localeCompare(a.last_name);
    });
  }
  sortDataFirstName = () => {
    this.sortDirectionFirstName = this.sortDirectionFirstName === 'asc' ? 'desc' : 'asc';
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      return this.sortDirectionFirstName === 'asc' ? a.first_name.localeCompare(b.first_name) : b.first_name.localeCompare(a.first_name);
    });
  }
}
