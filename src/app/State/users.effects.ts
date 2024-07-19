import { Actions, createEffect, ofType } from '@ngrx/effects';
import {inject} from "@angular/core";
import { catchError, map, switchMap, of } from 'rxjs';
import { UserApiService } from '../users/services/user-api.service';
import { LocalStorageService } from "../users/services/local-storage.service";
import { addUser, addUserFailure, addUserSuccess, deleteUsers, deleteUsersFailure, deleteUsersSuccess, loadUsers, loadUsersFailure, loadUsersSuccess, updateUser, updateUserFailure, updateUserSuccess } from './users.actions';
import { User } from "../users/models/User";

export const loadUserEffect = createEffect(() => {
  const api = inject(UserApiService);
  const actions$ = inject(Actions);
  const localStorageService = inject(LocalStorageService);
  return actions$.pipe(
    ofType(loadUsers),
    switchMap(() => {
      return api.getUsers().pipe(
        map((users: User[]) => {
          localStorageService.setItem('users', users); // Сохраняем в localStorage
          return loadUsersSuccess({ users });
        }),
        catchError(error => of(loadUsersFailure({ error })))
      );
    })
  );
}, { functional: true });

export const deletedUsersEffect = createEffect(() => {
  const api = inject(UserApiService);
  const actions$ = inject(Actions);
  const localStorageService = inject(LocalStorageService);
  return actions$.pipe(
    ofType(deleteUsers),
    switchMap(action => {
      return api.deleteUser(action.userId).pipe(
        map(() => {
          let users = localStorageService.getItem<User[]>('users') || [];
          users = users.filter(user => user.id !== action.userId);
          localStorageService.setItem('users', users); // Обновляем localStorage
          return deleteUsersSuccess({ userId: action.userId });
        }),
        catchError(error => of(deleteUsersFailure({ error })))
      );
    })
  );
}, { functional: true });

export const addUserEffect = createEffect(() => {
  const api = inject(UserApiService);
  const actions$ = inject(Actions);
  const localStorageService = inject(LocalStorageService);
  return actions$.pipe(
    ofType(addUser),
    switchMap(action => {
      return api.addUser(action.user).pipe(
        map((user: User) => {
          const users = localStorageService.getItem<User[]>('users') || [];
          users.push(user);
          localStorageService.setItem('users', users); // Обновляем localStorage
          return addUserSuccess({ user });
        }),
        catchError(error => of(addUserFailure({ error })))
      );
    })
  );
}, { functional: true });

export const updateUserEffect = createEffect(() => {
  const api = inject(UserApiService);
  const actions$ = inject(Actions);
  const localStorageService = inject(LocalStorageService);
  return actions$.pipe(
    ofType(updateUser),
    switchMap(action => {
      return api.updateUser(action.user).pipe(
        map((user: User) => {
          let users = localStorageService.getItem<User[]>('users') || [];
          users = users.map(u => u.id === user.id ? user : u);
          localStorageService.setItem('users', users); // Обновляем localStorage
          return updateUserSuccess({ user });
        }),
        catchError(error => {
          console.error('Error updating user:', error); // Отладка
          return of(updateUserFailure({ error }));
        })
      );
    })
  );
}, { functional: true });
