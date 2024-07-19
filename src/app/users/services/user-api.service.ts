import {inject, Injectable} from '@angular/core';
import { environment} from "../../../invironments/invironment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  // private URL_API = `${environment.apiUrl}/users`;
  public environment = inject(environment);
  private URL_API = `${this.environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL_API);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_API}/${userId}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.URL_API, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.URL_API}/${user.id}`, user);
  }
}
