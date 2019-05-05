import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class UsersService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get('http://localhost:3000/api/users');
  }

  addUsers(userBody) {
    return this.http.post('http://localhost:3000/api/users', userBody);
  }

  deleteUser(userID: string) {
    return this.http.delete('http://localhost:3000/api/users/' + userID);
  }

  getUserID(userID: string): Observable<any> {
    return this.http.get('http://localhost:3000/api/users/' + userID);
  }

  saveUser(userID, userBody) {
    return this.http.put('http://localhost:3000/api/users/' + userID, userBody);
  }

  // saveImage(file) {
  //   return this.http.post('http://localhost:3000/api/users/img', file);
  // }
}
