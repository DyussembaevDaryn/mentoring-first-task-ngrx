import { Routes } from '@angular/router';
import {UserListComponent} from "./users/components/user-list/user-list.component";

export const routes: Routes = [
  {
    path: 'users', component:UserListComponent
  }
];
