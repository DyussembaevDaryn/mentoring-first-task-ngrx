import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../models/User";
import {UserApiService} from "./user-api.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly USERS_KEY = 'users';

  constructor(private usersApi: UserApiService) {
    const storedUsers = this.localStorageService.getItem<User[]>(this.USERS_KEY);
    if (storedUsers && Array.isArray(storedUsers) && storedUsers.length > 0) {
      this.usersSubject$.next(storedUsers);
    } else {
      this.usersApi.getUsers().subscribe((data: User[]) => {
        this.usersSubject$.next(data);
        this.localStorageService.setItem(this.USERS_KEY, data);
      });
    }
  }


  public deleteUsers(id: number) {
    const updatedUsers = this.usersSubject$.value.filter(user => user.id !== id);
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.setItem(this.USERS_KEY, updatedUsers);
  }

  public getNextId(): number {
    const currentUsers = this.usersSubject$.value;
    const maxId = currentUsers.reduce((max, user) => user.id > max ? user.id : max, 0);
    return maxId + 1;

  }

  public addUser(user: User): void {
    const currentUsers = this.usersSubject$.value;
    const newUser = { ...user, id: this.getNextId() };
    const updatedUsers = [...currentUsers, newUser];
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.setItem(this.USERS_KEY, updatedUsers);
  }

  public updateUser(updatedUser: User): void {
    const currentUsers = this.usersSubject$.value;
    const updatedUsers = currentUsers.map(user => user.id === updatedUser.id ? updatedUser : user);
    this.usersSubject$.next(updatedUsers);
    this.localStorageService.setItem(this.USERS_KEY, updatedUsers);
  }
}

