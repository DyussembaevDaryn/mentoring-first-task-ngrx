import { createReducer, on } from '@ngrx/store';
import * as UserActions from "./users.actions";
import {User} from "../users/models/User";



export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}
export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const USERS_FEATURE_KEY = 'users'

export const usersReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: ''
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users:[...users],
    loading: false,
    error: null
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.deleteUsersSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter(u => u.id !== userId),
    error: null
  })),
  on(UserActions.deleteUsersFailure, (state, { error }) => ({
    ...state,
    loading:false,
    error,
  })),
  on(UserActions.addUser, state => ({
    ...state,
    loading: true,
    error: ''
  })),
  on(UserActions.addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  })),
  on(UserActions.addUserFailure, (state, { error}) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(UserActions.updateUser, state => ({
    ...state,
    loading: true,
    error: ''
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u)
  })),
  on(UserActions.updateUserFailure, (state, { error}) => ({
    ...state,
    loading: false,
    error: error
  })),
);
