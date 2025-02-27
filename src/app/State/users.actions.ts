import { createAction, props } from '@ngrx/store';
import {User} from "../users/models/User";

export const loadUsers = createAction(
  '[User] Load Users'
);
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>());
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>());

export const addUser = createAction(
  '[User] Add User',
  props<{ user: User }>());
export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: User }>());
export const addUserFailure = createAction(
  '[User] Add User Failure',
  props<{ error: any }>());

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>());
export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>());
export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>());

export const deleteUsers = createAction(
  '[User] Delete User',
  props<{ userId: number }>());
export const deleteUsersSuccess = createAction(
  '[User] Delete User Success',
  props<{ userId: number }>());
export const deleteUsersFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>());


