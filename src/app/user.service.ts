import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RandomUserResponse } from './interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://randomuser.me/api';

  constructor(private http: HttpClient) { }

  getUsers(results: number): Observable<RandomUserResponse> {
    return this.http.get<RandomUserResponse>(`${this.apiUrl}?results=${results}`);
  }
}
